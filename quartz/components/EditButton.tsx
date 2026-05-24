import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const ADMIN_URL = "https://tamasora-wiki.pages.dev/admin"

// Static mappings for fixed character collections
const COLLECTION_MAP: Record<string, string> = {
  "Characters/SxS PCs": "sxs_characters",
  "Characters/Scribes PCs": "scribes_characters",
  "Weastern Legends/Wind of the Weast PCs": "wind_of_the_weast_pcs",
  "Weastern Legends": "weastern_legends",
}

// Slugify subfolder names into snake_case collection names
// (must match the algorithm used in the sync GitHub Action)
const toCollectionName = (s: string) => s.toLowerCase().replace(/[\s-]+/g, "_")

const EditButton: QuartzComponent = ({ fileData }: QuartzComponentProps) => {
  const filePath = fileData.filePath ?? ""

  // Normalise path separators, strip leading slash, and drop the leading "content/" prefix
  const normalised = filePath
    .replace(/\\/g, "/")
    .replace(/^\//, "")
    .replace(/^content\//, "")

  let collection: string | undefined
  let entryName: string | undefined

  // Auto-derive collection from a_Recaps/<subfolder>/<file>.md
  if (normalised.startsWith("a_Recaps/")) {
    const parts = normalised.split("/")
    if (parts.length >= 3) {
      collection = toCollectionName(parts[1])
      entryName = parts.slice(2).join("/").replace(/\.md$/, "")
    }
  } else {
    // Fall back to static character mappings
    for (const [folder, col] of Object.entries(COLLECTION_MAP)) {
      if (normalised.includes(folder + "/")) {
        collection = col
        const afterFolder = normalised.split(folder + "/")[1]
        entryName = afterFolder?.replace(/\.md$/, "")
        break
      }
    }
  }

  if (!collection || !entryName) return null

  const editUrl = `${ADMIN_URL}/#/collections/${collection}/entries/${encodeURIComponent(entryName)}`

  return (
    <a href={editUrl} class="edit-button" target="_blank" rel="noopener noreferrer">
      ✏ Edit this page
    </a>
  )
}

EditButton.css = `
.edit-button {
  display: inline-block;
  margin: 1rem 0 0.5rem 0;
  padding: 0.4rem 0.9rem;
  background-color: var(--secondary);
  color: var(--light) !important;
  border-radius: 5px;
  text-decoration: none;
  font-size: 0.85rem;
  transition: background-color 0.2s ease;
}
.edit-button:hover {
  background-color: var(--tertiary);
}
`

export default (() => EditButton) satisfies QuartzComponentConstructor
