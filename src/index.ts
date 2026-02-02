import { syncPublic } from "@meta";
import {
  categories,
  generateCategories,
  generateManifest,
  generateResourceTypes,
  manifest,
  resourceTypes,
} from "@content";
import {
  alloys,
  elements,
  gems,
  generateAlloys,
  generateElements,
  generateGems,
} from "@things";

// ? Meta
syncPublic();

// ? Content
generateManifest(manifest);
generateCategories(categories);
generateResourceTypes(resourceTypes);

// ? Things
generateElements(elements);
generateGems(gems);
generateAlloys(alloys);
