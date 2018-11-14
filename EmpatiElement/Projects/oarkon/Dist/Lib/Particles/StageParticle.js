import { render } from "../Particles";
export var Stages;
(function (Stages) {
    Stages[Stages["Offline"] = 0] = "Offline";
    Stages[Stages["Idle"] = 1] = "Idle";
    Stages[Stages["Connecting"] = 2] = "Connecting";
    Stages[Stages["Constr"] = 3] = "Constr";
    Stages[Stages["NeedsUpdate"] = 4] = "NeedsUpdate";
    Stages[Stages["Update"] = 5] = "Update";
    Stages[Stages["Updated"] = 6] = "Updated";
    Stages[Stages["Render"] = 7] = "Render";
    Stages[Stages["FirstRender"] = 8] = "FirstRender";
    Stages[Stages["Rendered"] = 9] = "Rendered";
    Stages[Stages["Moving"] = 10] = "Moving";
    Stages[Stages["Disconnecting"] = 11] = "Disconnecting";
})(Stages || (Stages = {}));
export default function StageParticle(Ctor) {
    return class StageParticleP extends Ctor {
        constructor() {
            super(...arguments);
            this.$Stage = Stages.Constr;
            this.$RenderedOnce = false;
            this.$BatchedWorkOnQueue = true;
        }
        async $Constr() {
            if ("Constr" in this)
                this.Constr();
            this.$Stage = Stages.Idle;
            await this.$Idle();
        }
        async $Update() {
            if (this.$Stage !== Stages.NeedsUpdate)
                return;
            this.$Stage = Stages.Update;
            if ("Update" in this)
                await this.Update();
            this.$Stage = Stages.Updated;
            await this.$Render();
        }
        async $Render() {
            if (this.$Stage !== Stages.Updated)
                return;
            this.$Stage = Stages.Render;
            if ("Render" in this)
                render(await this.Render(), this.Root);
            if (!this.$RenderedOnce) {
                this.$Stage = Stages.FirstRender;
                if ("FirstRender" in this)
                    await this.FirstRender();
                this.$RenderedOnce = true;
            }
            this.$Stage = Stages.Rendered;
            if ("Rendered" in this)
                await this.Rendered();
            this.$Stage = Stages.Idle;
            await this.$Idle();
        }
        async $Idle() {
            if (this.$BatchedWorkOnQueue) {
                this.$BatchedWorkOnQueue = false;
                this.$Stage = Stages.NeedsUpdate;
                await this.$Update();
            }
        }
        async ReRender() {
            this.$Stage = Stages.NeedsUpdate;
            await this.$Update();
        }
    };
}
//# sourceMappingURL=StageParticle.js.map