import { useCallback, useEffect } from "react";
import i18next from "i18next";
import useSWR from "swr";

export interface PentahoFile {
  objectId: string;
  name: string;
  title: string;
  path: string;
  folder: boolean;
}

export interface PentahoFileTree {
  file: PentahoFile,
  children: PentahoFileTree[];
}

export const HOST = import.meta.env.VITE_HOST ?? "";

export default () => {
  const fetcher = useCallback(async (url: string) => {
    try {
      const { children: [data] } = await fetch(url).then((res) => res.json());

      return data as PentahoFileTree;
    } catch (ex) {
      console.error("error fetching repository tree", ex);
    }

    return null;
  }, [i18next.language]);

  const {
    data,
    isLoading,
    mutate
  } = useSWR(() => {
    const params = new URLSearchParams({
      depth: "0",
      showHidden: "false"
    });

    return `${HOST}/pentaho/plugin/scheduler-plugin/api/generic-files/tree?${params.toString()}`;
  }, fetcher);

  useEffect(() => {
    mutate().then(() => console.log("mutated browse files"));
  }, [i18next.language]);

  return { data, isLoading, mutate };
};
