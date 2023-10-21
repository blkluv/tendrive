"use client";

import folderService from "@/appwrite/folderService";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { setFoldersData } from "@/redux/folderSlice";
import React, { useEffect } from "react";
import InitialPage from "./InitialPage";
import Folders from "@/components/Folders";
import fileService from "@/appwrite/fileService";
import { setFilesData } from "@/redux/fileSlice";
import Files from "@/components/Files";

const Drive = () => {
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.user);
  const { foldersData } = useAppSelector((state) => state.folder);
  const { filesData } = useAppSelector((state) => state.file);

  useEffect(() => {
    if (user) {
      folderService
        .getHomeFolders({ userId: user?.$id })
        .then((folders) => dispatch(setFoldersData(folders)))
        .catch((error) => console.error(error));
      fileService
        .getFiles({ userId: user.$id })
        .then((files) => dispatch(setFilesData(files)))
        .catch((error) => console.error(error));
    }
  }, [dispatch, user]);

  return (
    <div className="p-4 pb-24 overflow-y-auto h-full">
      {foldersData && <Folders data={foldersData} />}
      {filesData && <Files filesData={filesData} />}
      {!foldersData && <InitialPage />}
    </div>
  );
};

export default Drive;