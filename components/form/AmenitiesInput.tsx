"use client";
import { amenities, Amenity } from "@/utils/amenities";
import { Check } from "lucide-react";
import React, { useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

const AmenitiesInput = ({ defaultValue }: { defaultValue?: Amenity[] }) => {
  const [selectedAmenities, setSelectedAmenities] = useState<Amenity[]>(
    defaultValue || amenities
  );

  const handleChange = (amenity: Amenity) => {
    setSelectedAmenities((prev) => {
      return prev.map((a) => {
        if (a.name === amenity.name) {
          return { ...a, selected: !a.selected };
        }
        return a;
      });
    });
  };

  return (
    <section>
      <input
        type="hidden"
        name="amenities"
        value={JSON.stringify(selectedAmenities)}
      />
      <div className="grid grid-cols-2 gap-4">
        {selectedAmenities.map((amenity) => {
          return (
            <div key={amenity.name} className="flex items-center space-x-2">
              <Checkbox
                id={amenity.name}
                checked={amenity.selected}
                onCheckedChange={() => handleChange(amenity)}
              />

              <Label
                htmlFor={amenity.name}
                className="flex items-center text-sm font-medium leading-none capitalize gap-x-2"
              >
                {amenity.name} <amenity.icon className="w-4 h-4" />
              </Label>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default AmenitiesInput;
