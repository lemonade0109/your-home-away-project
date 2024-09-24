import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

type PriceInputProps = {
  defaultValue?: number;
};

const PriceInput = (props: PriceInputProps) => {
  const name = "price";
  const { defaultValue } = props;

  return (
    <div className="mb-2">
      <Label htmlFor={name} className="capitalize">
        Prices ($)
      </Label>
      <Input
        id={name}
        type="number"
        name={name}
        min={0}
        defaultValue={defaultValue || 100}
        required
      />
    </div>
  );
};

export default PriceInput;
