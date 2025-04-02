import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useState } from "react";
import CODE_SNIPPETS from "@/app/constants";

const languages  = Object.entries(CODE_SNIPPETS);

const LanguageSelector = ({ language,  onSelect }) => {
  const [selectedLanguage, setSelectedLanguage] = useState();

  const handleSelectChange = (language) => {
    setSelectedLanguage(language);
    onSelect(language);
  };

  return(
    <div className="mb-4">
      <p className="mb-2 font-medium">Please select a challenge: </p>
      <Select value={selectedLanguage} onValueChange={handleSelectChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Debug_Excercise_L0" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {
              languages.map(([language, version]) => (
                <SelectItem key={language} value={language} onClick={() => onSelect(language)}>
                  {language}
                </SelectItem>
              ))
            }
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default LanguageSelector;

