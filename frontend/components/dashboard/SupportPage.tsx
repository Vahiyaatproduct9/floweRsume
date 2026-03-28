import React from "react";
import { FileText, MessageSquare, Sparkles, Mail, LifeBuoy } from "lucide-react";

export interface SupportCard {
  title: string;
  description: string;
  icon: string;
}

export interface SupportData {
  title: string;
  description: string;
  email: string;
  cards: SupportCard[];
}

interface SupportSectionProps {
  data: SupportData;
}

const SupportSection: React.FC<SupportSectionProps> = ({ data }) => {
  return (
    <div className="flex flex-col gap-10">
      <div>
        <h2 className="text-3xl font-black text-foreground tracking-tight mb-2">
          {data.title}
        </h2>
        <p className="text-muted font-medium max-w-2xl">
          {data.description}
        </p>
      </div>

      <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {data.cards.map((card) => {
          const iconMap: Record<string, React.ReactNode> = {
            FileText: <FileText size={24} />,
            MessageSquare: <MessageSquare size={24} />,
            Sparkles: <Sparkles size={24} />,
          };

          return (
            <div
              key={card.title}
              className="rounded-[2rem] border border-border/50 bg-card p-7 shadow-sm transition-all duration-300 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5"
            >
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-5">
                {iconMap[card.icon] || <LifeBuoy size={24} />}
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                {card.title}
              </h3>
              <p className="text-sm text-muted leading-6">{card.description}</p>
            </div>
          );
        })}
      </section>

      <section className="rounded-[2rem] border border-primary/20 bg-accent/30 p-8 lg:p-10 flex flex-col gap-8">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-8 bg-primary rounded-full" />
              <h3 className="text-sm font-black uppercase tracking-[0.2em] text-foreground">
                How Support Works
              </h3>
            </div>
            <p className="text-foreground/90 font-medium leading-7">
              For the fastest help, share a short summary of the issue, what you
              were trying to do, and whether it happened during upload,
              optimization, template selection, or export. That gives the team
              enough context to troubleshoot quickly.
            </p>
          </div>

          <div className="rounded-3xl border border-border/40 bg-background px-5 py-4 flex items-center gap-4 min-w-fit">
            <div className="w-11 h-11 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20">
              <Mail size={20} />
            </div>
            <div>
              <p className="text-xs font-black tracking-[0.2em] text-muted uppercase mb-1">
                Contact Email
              </p>
              <a
                href={`mailto:${data.email}`}
                className="font-bold text-foreground hover:text-primary transition-colors break-all"
              >
                {data.email}
              </a>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-3xl border border-border/40 bg-background p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                <LifeBuoy size={18} />
              </div>
              <h4 className="font-bold text-foreground">What to include</h4>
            </div>
            <ul className="space-y-3 text-sm text-muted leading-6">
              <li>• A quick summary of the issue or request</li>
              <li>• What section of the dashboard you were using</li>
              <li>• What result you expected to see</li>
              <li>• Any visible error or unusual behavior</li>
            </ul>
          </div>

          <div className="rounded-3xl border border-border/40 bg-background p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                <MessageSquare size={18} />
              </div>
              <h4 className="font-bold text-foreground">Support summary</h4>
            </div>
            <p className="text-sm text-muted leading-6">
              floweRsume support covers product questions, resume optimization
              guidance, template selection help, and issue reporting for the
              dashboard experience. The design here stays intentionally calm,
              editorial, and consistent with the rest of the workspace.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SupportSection;
