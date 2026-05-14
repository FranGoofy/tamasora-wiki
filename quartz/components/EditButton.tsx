import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const EditButton: QuartzComponent = ({ fileData }: QuartzComponentProps) => {
  const editUrl = fileData.frontmatter?.editUrl as string | undefined
  if (!editUrl) return null

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
