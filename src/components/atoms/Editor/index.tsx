import React from 'react'
import { useController, useFormContext } from 'react-hook-form'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

export type EditorProps = {
  name: 'content'
  disabled?: boolean
}

type FormData = {
  [x: string]: string
}

const Editor: React.FC<EditorProps> = ({ name, disabled }) => {
  const { control } = useFormContext<FormData>()
  const {
    field: { onChange, ...field },
  } = useController({ control, name })

  return (
    <CKEditor
      config={{
        toolbar: ['undo', 'redo', '|', 'heading', 'bold', 'italic'],
        heading: {
          options: [
            {
              model: 'paragraph',
              title: 'P',
              class: 'ck-heading_paragraph',
            },
            {
              model: 'heading1',
              view: 'h1',
              title: 'H1',
              class: 'ck-heading_heading1',
            },
          ],
        },
      }}
      disabled={disabled}
      editor={ClassicEditor}
      data={field.value}
      ref={field.ref}
      onChange={(_event, editor) => {
        const data = editor.getData()
        onChange(data)
      }}
      onBlur={field.onBlur}
    />
  )
}

export default Editor
