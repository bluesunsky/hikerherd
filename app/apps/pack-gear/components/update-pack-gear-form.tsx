import type { FC } from "react";
import type { PromiseReturnType } from "blitz";

import { Fragment, useContext } from "react";
import { useMutation, useQuery } from "blitz";

import { useTranslation } from "react-i18next";
import { FORM_ERROR } from "final-form";
import { Center } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";

import ModalForm from "app/components/forms/components/modal-form";
import { gToOz, ozTog } from "app/helpers/display-weight";
import GearFormFields from "app/apps/gear/components/gear-form-fields";
import userPreferencesContext from "app/apps/users/contexts/user-preferences-context";

import updatePackGearMutation from "../mutations/update-pack-gear-mutations";
import packGearQuery from "../queries/pack-gear-query";
import updatePackGearSchema from "../schemas/update-pack-gear-schema";

type UpdatePackGearFormProps = {
  id?: string | null;
  onSuccess?: (gear: PromiseReturnType<typeof updatePackGearMutation>) => void;
  isOpen: boolean;
  onClose: () => void;
};

const UpdatePackGearForm: FC<UpdatePackGearFormProps> = ({
  id,
  onSuccess,
  isOpen,
  onClose,
}) => {
  const [updateGear] = useMutation(updatePackGearMutation);
  const { weightUnit } = useContext(userPreferencesContext);
  const { t } = useTranslation();
  const [gearItem, { isLoading }] = useQuery(
    packGearQuery,
    { id },
    { suspense: false, enabled: !!id }
  );

  const initialValues = {
    id: gearItem?.id,
    name: gearItem?.gear.name,
    manufacturer: gearItem?.gear.manufacturer,
    kind: gearItem?.gear.kind,
    weight:
      weightUnit === "IMPERIAL"
        ? Math.round(gToOz(gearItem?.gear.weight || 0) * 100) / 100
        : Math.round(gearItem?.gear.weight || 0),
    price: gearItem?.gear.price && gearItem?.gear.price / 100,
    currency: gearItem?.gear.currency,
    location: gearItem?.gear.location,
    link: gearItem?.gear.link,
    imageUrl: gearItem?.gear.imageUrl,
    notes: gearItem?.gear.notes,
    consumable: gearItem?.gear.consumable,
    replaceable: gearItem?.gear.replaceable,
    private: gearItem?.gear.private,
    worn: gearItem?.worn,
    purchaseDate: gearItem?.gear.purchaseDate,
  };

  return (
    <ModalForm
      isOpen={isOpen}
      onClose={onClose}
      title={t("UpdateGear", "Editing {{gearname}}", {
        gearname: gearItem ? gearItem?.gear.name : "",
      })}
      schema={updatePackGearSchema}
      size="lg"
      submitText={t("Update", "Update")}
      initialValues={initialValues}
      onSubmit={async (values) => {
        try {
          const vals = { ...values };

          if (weightUnit === "IMPERIAL") {
            vals.weight = ozTog(values.weight);
          }

          if (values.price) {
            vals.price = Math.floor(values.price * 100);
          }

          const result = await updateGear(vals);

          onClose();
          if (onSuccess) {
            onSuccess(result);
          }
        } catch (error: unknown) {
          return {
            [FORM_ERROR]: t(
              "EditGearError",
              "Sorry, there was an unexpected error. Please try again."
            ),
          };
        }
      }}
      render={() => (
        <Fragment>
          {isLoading ? (
            <Center p={3}>
              <Spinner />
            </Center>
          ) : (
            <GearFormFields includeWorn />
          )}
        </Fragment>
      )}
    />
  );
};

export default UpdatePackGearForm;
