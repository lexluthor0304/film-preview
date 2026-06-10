import ClusterGuidePage from "@/components/ClusterGuidePage";
import { getClusterGuide } from "@/lib/cluster-guides";
import { buildMetadata, englishOnlyLanguageAlternates } from "@/lib/seo";

const path = "/guides/best-free-negative-viewer";
const guide = getClusterGuide(path);

export const metadata = buildMetadata({
  title: guide.title,
  description: guide.description,
  path,
  type: "article",
  languages: englishOnlyLanguageAlternates(path),
});

export default function BestFreeNegativeViewerPage() {
  return <ClusterGuidePage guide={guide} path={path} />;
}
