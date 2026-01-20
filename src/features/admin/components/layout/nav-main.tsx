"use client";

import { ChevronRight, Plus, type LucideIcon } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url?: string;
    shortCutLink?: string;
    icon?: LucideIcon;
    isActive?: boolean;
    canAddShortcut?: boolean;
    children?: {
      title: string;
      url?: string;
      icon?: LucideIcon;
      canAddShortcut?: boolean;
      isActive?: boolean;
      shortCutLink?: string;
    }[];
  }[];
}) {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem className="mb-2">
              {item.children ? (
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip={item.title}>
                    {item.icon && <item.icon />}
                    <span className="text-base font-medium">{item.title}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
              ) : item.url ? (
                <SidebarMenuButton asChild tooltip={item.title}>
                  <Link
                    href={item.url}
                    className={cn(
                      pathname === item.url && "bg-main-green text-white w-full flex items-center justify-between"
                    )}
                  >
                    <span className="text-sm font-medium flex items-center gap-2 flex-1">{item.icon && <item.icon size={16} />} <span className="text-base font-medium">{item.title}</span></span>
                    {item.canAddShortcut && <Plus className="h-4 w-4 cursor-pointer" onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      router.push(item.shortCutLink ?? "");
                    }} />}
                  </Link>
                </SidebarMenuButton>
              ) : (
                <SidebarMenuButton tooltip={item.title}>
                  <div
                    className={cn(
                      pathname === item.url && "bg-main-green text-white"
                    )}
                  >
                    {item.icon && <item.icon />}
                    <span className="text-base font-medium">{item.title} </span>
                  </div>
                </SidebarMenuButton>
              )}
              <CollapsibleContent>
                <SidebarMenuSub className="w-[96%]">
                  {item.children?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton asChild>
                        <Link
                          href={subItem.url ?? ""}
                          className="w-full flex items-center justify-between"
                        >
                          <span className="text-sm font-medium">
                            {subItem.title}
                          </span>
                          {subItem.canAddShortcut && (
                            <Plus
                              className="cursor-pointer  !text-gray-400 duration-300 hover:!text-white"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                router.push(subItem.shortCutLink ?? "");
                              }}
                            />
                          )}
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
