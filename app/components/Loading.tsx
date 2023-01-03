import AnimatedLogo from "@/components/svg/AnimatedLogo";

export default function Loading() {
  return (
    <>
      <div className="w-16 mx-auto pt-4">
        <AnimatedLogo speed={1.5} />
      </div>
    </>
  );
}
