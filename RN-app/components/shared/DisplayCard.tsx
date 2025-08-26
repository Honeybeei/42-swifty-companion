import { Card } from "./gluestack-ui/card";
import { Heading } from "./gluestack-ui/heading";

export default function DisplayCard({
  children,
  className,
  title,
}: {
  children: React.ReactNode;
  className?: string;
  title?: string;
}) {
  return (
    <Card
      className={`p-6 mb-4 rounded-3xl shadow-soft-3 bg-highlight-0 ${className}`}
      variant="elevated"
    >
      {title && (
        <Heading size="xl" className="text-typography-900 mb-4">
          {title}
        </Heading>
      )}
      {children}
    </Card>
  );
}
