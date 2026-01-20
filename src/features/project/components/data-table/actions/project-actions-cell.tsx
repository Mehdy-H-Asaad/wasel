"use client";
import { TProjectDTO } from "../../../schema/project.schema";
import { useDeleteProject } from "../../../hooks/use-delete-project";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { DeleteDialog } from "@/components/common/DeleteDialog";
import { Row } from "@tanstack/react-table";
import { UpdateProject } from "../../UpdateProject";

export const ProjectActionsCell = ({
  row,
}: {
  row: Row<TProjectDTO>;
}) => {
  const project = row.original;
  const { deleteProject, isDeletingProject } = useDeleteProject(project.id);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Options</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <div className="flex flex-col gap-2">
          <UpdateProject project={project} />
          <DeleteDialog
            deleteFunc={deleteProject}
            isLoading={isDeletingProject}
            trigger="Delete Project"
          />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
