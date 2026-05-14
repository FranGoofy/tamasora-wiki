import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const ADMIN_URL = "https://tamasora-wiki.pages.dev/admin"

const COLLECTION_MAP: Record<string, string> = {
  "Characters/SxS PCs": "sxs_characters",
  "Characters/Scribes PCs": "scribes_characters",
  "a_Recaps": "recaps",
}

const EditButton: QuartzComponent = ({ fileData }: QuartzComponentProps) => {
  const slug = fileData.slug ?? ""

  let collection: string | undefined
  let entryName: string | undefined

  for (const [folder, col] of Object.entries(COLLECTION_MAP)) {
    if (slug.startsWith(folder + "/")) {
      collection = col
      entryName = slug.slice(folder.length + 1)
      break
    }
  }

  if (!collection || !entryName) return null

  const editUrl = `${ADMIN_URL}/#/collections/${collection}/entries/${entryName}`

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
