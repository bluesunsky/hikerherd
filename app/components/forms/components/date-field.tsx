import type { ComponentPropsWithoutRef } from "react";

import { forwardRef, useRef } from "react";

import { useTranslation } from "react-i18next";
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ name, label, icon, suffix, ...props }, _) => {
    const datePickerRef = useRef(null);
    const { t } = useTranslation();
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
    const weekDays = [
      t("DayShort01", "Sun"),
      t("DayShort02", "Mon"),
      t("DayShort03", "Tue"),
      t("DayShort04", "Wed"),
      t("DayShort05", "Thu"),
      t("DayShort06", "Fri"),
      t("DayShort07", "Sat"),
    ];
    const months = [
      t("MonthShort01", "Jan"),
      t("MonthShort02", "Feb"),
      t("MonthShort03", "Mar"),
      t("MonthShort04", "Apr"),
      t("MonthShort05", "May"),
      t("MonthShort06", "Jun"),
      t("MonthShort07", "Jul"),
      t("MonthShort08", "Aug"),
      t("MonthShort09", "Sep"),
      t("MonthShort10", "Oct"),
      t("MonthShort11", "Nov"),
      t("MonthShort12", "Dec"),
    ];

    return (
      <FormControl isInvalid={meta.touched && error}>
        {label && <FormLabel>{label}</FormLabel>}

        <InputGroup>
          {icon && <InputLeftElement>{icon}</InputLeftElement>}
          <DatePicker
            arrow={false}
            weekDays={weekDays}
            months={months}
            weekStartDayIndex={1}
            showOtherDays
            mapDays={({ date }) => {
              let props: any = {};
              let isWeekend = [0, 6].includes(date.weekDay.index);

              if (isWeekend) props.className = "highlight highlight-red";

              return props;
            }}
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
          >
            {" "}
            <button
              style={{ margin: "5px", marginRight: "20px" }}
              onClick={() => {
                input.onChange("");
                const current: any = datePickerRef?.current;
                current.closeCalendar();
              }}
            >
              {t("Clear", "Clear")}
            </button>
            <button
              style={{ margin: "5px" }}
              onClick={() => {
                const current: any = datePickerRef?.current;
                current.closeCalendar();
              }}
            >
              {t("Close", "Close")}
            </button>
          </DatePicker>
          <Input
            placeholder={t("SelectDate", "Select a date…")}
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
