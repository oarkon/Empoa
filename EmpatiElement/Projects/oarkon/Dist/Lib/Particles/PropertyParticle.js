import EEBase from "../Particles";
import { Stages } from "./StageParticle";
export class MinimalProperty extends PropertyParticle(EEBase) {
}
export function Property(Target, Key) {
    if (!("PropertySet" in Target))
        Target.PropertySet = [];
    Target.PropertySet.push(Key);
}
export function Attribute(Target, Key) {
    if (!("AttributeSet" in Target))
        Target.AttributeSet = [];
    if (!("observedAttributes" in Target))
        Target.observedAttributes = [];
    Target.AttributeSet.push(Key);
    Target.observedAttributes.push(Key.toLowerCase());
}
export default function PropertyParticle(Ctor) {
    return class PropertyParticleP extends Ctor {
        constructor(...args) {
            super(...args);
            this.Properties = {};
            if ("PropertySet" in this.Proto)
                this.Proto.PropertySet.forEach(x => this.$RegisterProperty(x));
            if ("AttributeSet" in this.Proto)
                this.Proto.AttributeSet.forEach(x => this.$RegisterProperty(x, true));
            for (let Key = this.attributes[0], i = 0; i < this.attributes.length; Key = this.attributes[i++])
                if (Key)
                    if (("PropertySet" in this.Proto &&
                        Key.name in this.Proto.PropertySet) ||
                        ("AttributeSet" in this.Proto &&
                            Key.name in this.Proto.AttributeSet))
                        this.Properties[Key.name] = Key.value;
                    else
                        this[Key.name] = Key.value;
        }
        static get observedAttributes() {
            return this.prototype.observedAttributes;
        }
        $RegisterProperty(Key, Attribute = false) {
            const IfFilter = `CanChange${Key}` in this.Proto;
            Object.defineProperty(this, Key, {
                get() {
                    return Attribute ? this.getAttribute(Key) : this.Properties[Key];
                },
                set(Value) {
                    const Old = this.Properties[Key];
                    if (Old === Value ||
                        (IfFilter &&
                            !this.Proto[`CanChange${Key}`].call(this, Value, Old)))
                        return;
                    this.Properties[Key] = Value;
                    if (Attribute && this.$Stage !== Stages.Constr)
                        this.setAttribute(Key, Value);
                    this.Dispatch("@" + Key, Value, Old);
                    if (this.$Stage === Stages.Idle) {
                        this.$Stage = Stages.NeedsUpdate;
                        this.$Update();
                    }
                    else
                        this.$BatchedWorkOnQueue = true;
                }
            });
        }
    };
}
//# sourceMappingURL=PropertyParticle.js.map