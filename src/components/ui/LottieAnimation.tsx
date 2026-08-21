import { useEffect, useRef } from "react";

type LottiePlayerInstance = {
  destroy: () => void;
};

type LottiePlayer = {
  loadAnimation: (params: {
    container: Element;
    renderer?: "svg" | "canvas" | "html";
    loop?: boolean;
    autoplay?: boolean;
    animationData: unknown;
  }) => LottiePlayerInstance;
};

declare global {
  interface Window {
    lottie?: LottiePlayer;
  }
}

type LottieAnimationProps = {
  animationData: unknown;
  loop?: boolean;
  autoplay?: boolean;
  className?: string;
};

export function LottieAnimation({ animationData, loop = true, autoplay = true, className }: LottieAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !window.lottie) return;

    const instance = window.lottie.loadAnimation({
      container,
      renderer: "svg",
      loop,
      autoplay,
      animationData,
    });

    return () => instance.destroy();
  }, [animationData, loop, autoplay]);

  return <div ref={containerRef} className={className} />;
}
