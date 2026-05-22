import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const ADMIN_URL = "https://tamasora-wiki.pages.dev/admin"

const COLLECTION_MAP: Record<string, string> = {
  "Characters/SxS PCs": "sxs_characters",
  "Characters/Scribes PCs": "scribes_characters",
  "a_Recaps/Solar x Scions Recaps": "sxs_recaps",
  "a_Recaps/Scribes": "scribes_recaps",
}

const EditButton: QuartzComponent = ({ fileData }: QuartzComponentProps) => {
  const filePath = fileData.filePath ?? ""

  // Normalise path separators and strip leading slash
  const normalised = filePath.replace(/\\/g, "/").replace(/^\//, "")

  let collection: string | undefined
  let entryName: string | undefined

  for (const [folder, col] of Object.entries(COLLECTION_MAP)) {
    if (normalised.includes(folder + "/")) {
      collection = col
      // Extract filename after the folder, strip .md extension
      const afterFolder = normalised.split(folder + "/")[1]
      entryName = afterFolder?.replace(/\.md$/, "")
      break
    }
  }

  if (!collection || !entryName) return null

  const slugify = (s: string) => s.replaceAll(" ", "-")
  const editUrl = `${ADMIN_URL}/#/collections/${collection}/entries/${entryName.split("/").map(slugify).join("/")}`

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
