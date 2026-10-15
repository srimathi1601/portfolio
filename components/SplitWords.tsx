type Props = {
  text: string;
  /** Wrap each word in an overflow mask so it can slide up into view. */
  mask?: boolean;
  /** Extra classes on each `.word` (gradient text must sit on the animated element itself). */
  wordClass?: string;
};

/** Splits copy into word spans (`.word`) that GSAP can animate. Server-renderable. */
export default function SplitWords({ text, mask, wordClass = "" }: Props) {
  return (
    <>
      {text.split(" ").map((word, i, all) => (
        <span key={i}>
          {mask ? (
            <span className="inline-block overflow-hidden pb-[0.12em] align-bottom -mb-[0.12em]">
              <span className={`word inline-block ${wordClass}`}>{word}</span>
            </span>
          ) : (
            <span className={`word ${wordClass}`}>{word}</span>
          )}
          {i < all.length - 1 ? " " : null}
        </span>
      ))}
    </>
  );
}
