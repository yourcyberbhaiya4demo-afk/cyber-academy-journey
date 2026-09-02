import { useId, useState } from "react";
import type { ReactNode } from "react";

export type AccordionItem = {
  title: ReactNode;
  meta?: string;
  content: ReactNode;
};

export function Accordion({
  items,
  defaultOpen = -1,
  numbered = false,
}: {
  items: AccordionItem[];
  defaultOpen?: number;
  numbered?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const baseId = useId();

  return (
    <div className="border-[3px] border-ink bg-paper">
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `${baseId}-panel-${i}`;
        const buttonId = `${baseId}-button-${i}`;
        return (
          <div key={i} className={i > 0 ? "border-t-[3px] border-ink" : undefined}>
            <h3 className="m-0">
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="flex w-full items-center gap-4 px-5 py-5 text-left hover:bg-cream sm:px-7 sm:py-6"
              >
                {numbered ? (
                  <span className="font-display text-sm font-bold text-ink/45">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                ) : null}
                <span className="flex-1 font-display text-base font-bold uppercase sm:text-lg">
                  {item.title}
                </span>
                {item.meta ? (
                  <span className="eyebrow hidden text-ink/55 sm:inline">{item.meta}</span>
                ) : null}
                <span
                  aria-hidden="true"
                  className="flex h-8 w-8 shrink-0 items-center justify-center border-[3px] border-ink bg-yellow font-display text-lg leading-none"
                >
                  {isOpen ? "−" : "+"}
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="border-t-[3px] border-dashed border-ink/30 px-5 pb-7 pt-5 sm:px-7"
            >
              {item.meta ? (
                <p className="eyebrow mb-4 text-ink/55 sm:hidden">{item.meta}</p>
              ) : null}
              {item.content}
            </div>
          </div>
        );
      })}
    </div>
  );
}
