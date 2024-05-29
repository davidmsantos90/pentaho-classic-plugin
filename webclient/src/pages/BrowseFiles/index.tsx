import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import { css } from "@emotion/css";
import {
  HvButton,
  HvGrid,
  HvMultiButton,
  HvTypography
} from "@hitachivantara/uikit-react-core";
import RepositoryTree from "./RepositoryTree";
import { HOST, PentahoFile } from "./useBrowseFiles";

const buildAnalyzerUrl = (path: string, mode: string, locale: string) => {
  const file = path.replaceAll("/", ":");

  return `${HOST}/pentaho/api/repos/${file}/${mode}?showRepositoryButtons=true&locale=${locale}`;
}

export default () => {
  const { t } = useTranslation("testing");
  const [file, setFile] = useState<PentahoFile>();
  const [mode, setMode] = useState("viewer");

  return (
    <HvGrid container maxWidth="lg" rowSpacing="xs" direction="row">
      <HvGrid item xs={3}>
        <RepositoryTree onTreeItemClick={setFile} />
      </HvGrid>

      <HvGrid item xs={9} wrap="wrap" direction="column" display="flex" gap="10px">
        <HvGrid item xs={12} className={css({ display: "flex", flex: "none" })}>
          <HvTypography component="h1" variant="title3">
            {`${file?.title ?? "No file"} - ${file?.path ?? "?"}`}
          </HvTypography>

          <HvMultiButton className={css({ display: "flex", flex: "auto", "justify-content": "flex-end" })}>
            {["viewer", "editor"].map((id) => (
              <HvButton
                key={id}
                selected={id === mode}
                onClick={() => setMode(id)}
              >{t(`pages.browseFiles.${id}`)}</HvButton>
            ))}
          </HvMultiButton>
        </HvGrid>

        <HvGrid item xs={12}>
          {file?.path?.endsWith(".xanalyzer") && (
            <iframe src={buildAnalyzerUrl(file.path, mode, i18next.language)} width="100%" height="100%"></iframe>
          )}
        </HvGrid>
      </HvGrid>
    </HvGrid>
  );
};
