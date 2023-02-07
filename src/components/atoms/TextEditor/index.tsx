import React from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { useFormContext, useController } from 'react-hook-form'

export type HtmlEditorProps = {
  name: 'content'
}

type FormData = {
  [x: string]: string
}

const TextEditor = ({ name }: HtmlEditorProps) => {
  const { control } = useFormContext<FormData>()
  const {
    field: { onChange, ...field },
  } = useController({ control, name })

  return (
    <>
      <Editor
        apiKey={'qagffr3pkuv17a8on1afax661irst1hbr4e6tbv888sz91jc'}
        {...field}
        onEditorChange={onChange}
        init={{
          height: 200,
          menubar: false,
          statusbar: false,
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount',
          ],
          toolbar:
            'undo redo | formatselect | ' +
            'h1 bold italic | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist',
          content_style:
            'body { font-family:Gotham, sans-serif; font-size:14px; background-color: #141519; color: #D6B16D;};',
        }}
      />
    </>
  )
}

export default TextEditor
