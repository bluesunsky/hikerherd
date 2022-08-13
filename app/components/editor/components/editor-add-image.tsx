import { useContext } from "react";

import TextField from "app/components/forms/components/text-field";
import ModalForm from "app/components/forms/components/modal-form";

import addImageSchema from "../schemas/add-image-schema";
import editorContext from "../contexts/editor-context";

const EditorAddImage = () => {
  const { editor, addingImage, toggleAddingImage } = useContext(editorContext);

  return (
    <ModalForm
      isOpen={addingImage}
      onClose={toggleAddingImage}
      title="Ajouter une image"
      schema={addImageSchema}
      initialValues={{ image: "" }}
      submitText="Add"
      onSubmit={({ image }) => {
        editor.chain().focus().setImage({ src: image }).run();
        toggleAddingImage();
      }}
      render={() => (
        <TextField
          name="image"
          label="URL de l'image"
          placeholder="Copier l'URL de l'image"
        />
      )}
    />
  );
};

export default EditorAddImage;
