import React from "react";
import { Label } from "../ui/label";
import { formattedCountries } from "@/utils/countries";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import Flag from "react-world-flags";

const name = "country";

const CountriesInput = ({ defaultValue }: { defaultValue?: string }) => {
  return (
    <div>
      <Label htmlFor={name} className="capitalize">
        country
      </Label>

      <Select
        defaultValue={defaultValue || formattedCountries[0].code}
        name={name}
        required
      >
        <SelectTrigger id={name}>
          <SelectValue />
        </SelectTrigger>

        <SelectContent>
          {formattedCountries.map((country) => {
            return (
              <SelectItem key={country.code} value={country.code}>
                <span className="flex items-center gap-2">
                  <Flag code={country.code} style={{ width: 20, height: 20 }} />{" "}
                  {country.name}
                </span>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CountriesInput;
