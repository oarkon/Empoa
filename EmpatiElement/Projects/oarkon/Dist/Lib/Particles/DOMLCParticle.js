import StageParticle, { Stages } from "./StageParticle";
import EEBase from "../Particles";
import PropertyParticle from "./PropertyParticle";
class ParameterPrototype extends PropertyParticle(StageParticle(EEBase)) {
}
export default function DOMLCParticle(Ctor) {
    return class DOMLCParticleP extends Ctor {
        constructor() {
            super(...arguments);
            this.Style = {};
        }
        async connectedCallback() {
            this.$Stage = Stages.Connecting;
            if ("AttributeSet" in this.Proto)
                this.Proto.AttributeSet.map(x => {
                    this.setAttribute(x, this.Properties[x]);
                });
            Object.assign(this.style, this.Style);
            await this.$Constr();
        }
        async disconnectedCallback() {
            this.$Stage = Stages.Disconnecting;
            if ("Destr" in this)
                await this.Destr();
            this.$Stage = Stages.Idle;
        }
        async adoptedCallback() {
            this.$Stage = Stages.Moving;
            if ("Moved" in this)
                await this.Moved();
            this.$Stage = Stages.Idle;
        }
        attributeChangedCallback(Key, Old, New) {
            if (`CanChange${Key}` in this.Proto &&
                !this.Proto[`CanChange${Key}`].call(this, New, Old))
                this.setAttribute(Key, Old);
            else
                this.Properties[Key] = New;
            if (this.$Stage === Stages.Idle) {
                this.$Stage = Stages.NeedsUpdate;
                this.$Update();
            }
            else
                this.$BatchedWorkOnQueue = true;
        }
    };
}
//# sourceMappingURL=DOMLCParticle.js.map