import { useRef } from "react";
import { Save, Settings } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerHeader,
  DrawerTrigger,
  DrawerDescription,
  DrawerClose,
} from "./ui/drawer";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface DrawingInfoDrawerProps {
  title: string;
  description: string;
  onTitleChange: (title: string) => void;
  onDescriptionChange: (description: string) => void;
  initialTitle: string;
  initialDescription: string;
}

export default function DrawingSettingsDrawer({
  title,
  description,
  onTitleChange,
  onDescriptionChange,
  initialTitle,
  initialDescription,
}: DrawingInfoDrawerProps) {
  const initialValues = useRef({
    title: initialTitle,
    description: initialDescription,
  });
  const isDirty = {
    title: title !== initialValues.current.title,
    description: description !== initialValues.current.description,
  };

  return (
    <>
      <Drawer>
        <DrawerTrigger>
          <div className="w-10 h-10 flex items-center justify-center hover:bg-opacity-80 transition-colors cursor-pointer">
            <Settings
              className={`w-5 h-5 ${
                isDirty.title || isDirty.description
                  ? "text-brand-primary"
                  : "text-text-secondary"
              }`}
            />
          </div>
        </DrawerTrigger>
        <DrawerContent className="h-[50vh] px-8 pb-10 flex flex-col gap-4 bg-dark-surface border-text-secondary">
          <DrawerClose className="h-0 flex justify-end">
            <Save className="w-5 h-5 text-text-secondary" />
          </DrawerClose>
          <DrawerHeader>
            <DrawerTitle className="flex items-center justify-center gap-2">
              <Settings className="w-5 h-5" />
              Drawing Settings
            </DrawerTitle>
            <DrawerDescription className="text-text-secondary text-center">
              Set up the title and description of the drawing
            </DrawerDescription>
          </DrawerHeader>
          <div className="flex flex-col gap-3">
            <div>
              <Label htmlFor="title" className="text-text-secondary">
                Title
              </Label>
              <Input
                id="title"
                type="text"
                value={title}
                onChange={(e) => {
                  onTitleChange(e.target.value);
                }}
                maxLength={20}
                placeholder="Enter title"
                className={`${
                  isDirty.title ? "text-brand-primary" : "text-text-muted"
                }`}
              />
            </div>
            <div>
              <Label htmlFor="description" className="text-text-secondary">
                Description
              </Label>
              <Input
                id="description"
                type="text"
                value={description}
                onChange={(e) => {
                  onDescriptionChange(e.target.value);
                }}
                placeholder="Enter description"
                maxLength={70}
                className={`${
                  isDirty.description ? "text-brand-primary" : "text-text-muted"
                }`}
              />
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}
