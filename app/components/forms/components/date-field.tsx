import type { ComponentPropsWithoutRef } from "react";

import { forwardRef, useRef } from "react";

import { format } from "date-fns";
import DateObject from "react-date-object";
import DatePicker from "react-multi-date-picker";
import { useField } from "react-final-form";
import {
  Input,
  InputGroup,
  InputRightAddon,
  InputLeftElement,
} from "@chakra-ui/input";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/form-control";

import getFieldErrorMessage from "../helpers/get-field-error-message";

type TextFieldProps = ComponentPropsWithoutRef<typeof Input> & {
  name: string;
  label: string;
  type?: "text" | "password" | "email" | "number";
  icon?: JSX.Element;
  suffix?: JSX.Element;
};

const DateField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ name, label, icon, suffix, ...props }) => {
    const datePickerRef = useRef(null);
    /*const {
      input: { value, ...input },
      meta,
    } = useField<Date | string>(name, {
      type: "string",
    });
*/
    const {
      input: { value, ...input },
      meta,
    } = useField(name, {
      parse: (v) => {
        if (v === "") return null;
        var w = v.split("/");
        return new Date(+w[2], w[1] - 1, +w[0]);
      },
    });

    const error = getFieldErrorMessage(meta);

    return (
      <FormControl isInvalid={meta.touched && error}>
        {label && <FormLabel>{label}</FormLabel>}

        <InputGroup>
          {icon && <InputLeftElement>{icon}</InputLeftElement>}
          <DatePicker
            ref={datePickerRef as React.MutableRefObject<any>}
            value={value}
            onChange={(value) => {
              if (value instanceof DateObject)
                input.onChange(
                  value.day.toString().padStart(2, "0") +
                    "/" +
                    value.month.toString().padStart(2, "0") +
                    "/" +
                    value.year
                );
              else input.onChange("");
            }}
            {...props}
            style={{ display: "none" }}
          ></DatePicker>
          <Input
            placeholder="Sélectionner une date…"
            onClick={() => {
              const current: any = datePickerRef?.current;
              if (current != null) current.openCalendar();
            }}
            variant="filled"
            cursor="pointer"
            readOnly
            value={
              typeof value == "string" ? value : format(value, "dd/MM/yyyy")
            }
          />

          {suffix && <InputRightAddon>{suffix}</InputRightAddon>}
        </InputGroup>

        <FormErrorMessage>{error}</FormErrorMessage>
      </FormControl>
    );
  }
);

export default DateField;
