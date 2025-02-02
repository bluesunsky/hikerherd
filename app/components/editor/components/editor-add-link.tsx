import { useContext } from "react";

import TextField from "app/components/forms/components/text-field";
import ModalForm from "app/components/forms/components/modal-form";

import addLinkSchema from "../schemas/add-link-schema";
import editorContext from "../contexts/editor-context";

const EditorAddLink = () => {
  const { editor, addingLink, toggleAddingLink } = useContext(editorContext);

  return (
    <ModalForm
      isOpen={addingLink}
      onClose={toggleAddingLink}
      title="Ajouter un lien"
      schema={addLinkSchema}
      initialValues={{ link: editor.getAttributes("link").href || "" }}
      submitText="Ajouter"
      onSubmit={({ link }) => {
        if (!link || link === "") {
          editor.chain().focus().extendMarkRange("link").unsetLink().run();
          toggleAddingLink();
          return;
        }

        if (!link.match(/^https?\:\/\//)) {
          link = "https://" + link;
        }

        editor
          .chain()
          .focus()
          .extendMarkRange("link")
          .setLink({ href: encodeURI(link) })
          .run();

        toggleAddingLink();
      }}
      render={() => (
        <TextField name="link" label="Link" placeholder="https://…" />
      )}
    />
  );
};

export default EditorAddLink;
