import ProjectCard from "@/components/projects/ProjectCard";
import ErrorScreen from "@/components/shared/ErrorScreen";
import { Heading } from "@/components/shared/gluestack-ui/heading";
import { HStack } from "@/components/shared/gluestack-ui/hstack";
import { ChevronDownIcon } from "@/components/shared/gluestack-ui/icon";
import { ScrollView } from "@/components/shared/gluestack-ui/scroll-view";
import {
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
} from "@/components/shared/gluestack-ui/select";
import { Text } from "@/components/shared/gluestack-ui/text";
import { VStack } from "@/components/shared/gluestack-ui/vstack";
import Screen from "@/components/shared/layouts/Screen";
import LoadingScreen from "@/components/shared/LoadingScreen";
import { useUserStore } from "@/store/userStore";
import { ProjectUser } from "@/types";
import { useEffect, useState } from "react";

export default function ProjectsScreen() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState("date-desc");
  const { loadUserProfile, userProfile } = useUserStore();

  useEffect(() => {
    const loadProfile = async () => {
      setLoading(true);
      setError(null);
      // Check if user profile is already loaded
      if (userProfile) {
        setLoading(false);
        return;
      }
      const success = await loadUserProfile();
      if (!success) {
        setError("Failed to load user profile.");
      }
      setLoading(false);
    };
    loadProfile();
  }, [loadUserProfile, userProfile]);

  if (loading) {
    return <LoadingScreen message="Loading projects..." />;
  }

  if (error || !userProfile) {
    return <ErrorScreen message={error || "No user profile available."} />;
  }

  if (userProfile.projects_users.length === 0) {
    return (
      <Screen isSafeArea={false}>
        <VStack className="flex-1 justify-center items-center gap-4">
          <Text className="text-xl font-bold text-typography-900">
            No Projects Found
          </Text>
          <Text className="text-center text-typography-600">
            No project data available for this user.
          </Text>
        </VStack>
      </Screen>
    );
  }

  // Sort projects based on selected option
  const getSortedProjects = (projects: ProjectUser[]) => {
    const projectsCopy = [...projects];

    switch (sortOption) {
      case "date-desc":
        return projectsCopy.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      case "date-asc":
        return projectsCopy.sort(
          (a, b) =>
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );
      case "name-asc":
        return projectsCopy.sort((a, b) =>
          a.project.name.localeCompare(b.project.name)
        );
      case "name-desc":
        return projectsCopy.sort((a, b) =>
          b.project.name.localeCompare(a.project.name)
        );
      case "status":
        return projectsCopy.sort((a, b) => {
          const statusOrder = {
            finished: 0,
            in_progress: 1,
            searching_a_group: 2,
          };
          const aOrder = statusOrder[a.status as keyof typeof statusOrder] ?? 3;
          const bOrder = statusOrder[b.status as keyof typeof statusOrder] ?? 3;
          return aOrder - bOrder;
        });
      case "mark-desc":
        return projectsCopy.sort((a, b) => {
          const aFinalMark = a.final_mark ?? -1;
          const bFinalMark = b.final_mark ?? -1;
          return bFinalMark - aFinalMark;
        });
      case "mark-asc":
        return projectsCopy.sort((a, b) => {
          const aFinalMark = a.final_mark ?? -1;
          const bFinalMark = b.final_mark ?? -1;
          return aFinalMark - bFinalMark;
        });
      default:
        return projectsCopy.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
    }
  };

  const sortedProjects = getSortedProjects(userProfile.projects_users);

  return (
    <Screen isSafeArea={false}>
      <ScrollView className="flex-1 w-full pt-safe px-4">
        <VStack className="gap-4 p-2">
          <HStack className="justify-between items-center w-full">
            <Heading size="2xl" className="text-highlight-700">
              Projects ({sortedProjects.length})
            </Heading>

            {/* Sort Options */}
            <Select
              selectedValue={sortOption}
              onValueChange={(value) => setSortOption(value)}
              className="w-1/3"
            >
              <SelectTrigger
                variant="rounded"
                size="sm"
                className="w-full border-2 border-highlight-400 pr-2"
              >
                <SelectInput
                  placeholder="Sort by..."
                  value={
                    sortOption === "date-desc"
                      ? "Newest first"
                      : sortOption === "date-asc"
                      ? "Oldest first"
                      : sortOption === "name-asc"
                      ? "Name A-Z"
                      : sortOption === "name-desc"
                      ? "Name Z-A"
                      : sortOption === "status"
                      ? "Status"
                      : sortOption === "mark-desc"
                      ? "Highest mark"
                      : sortOption === "mark-asc"
                      ? "Lowest mark"
                      : "Newest first"
                  }
                />
                <SelectIcon as={ChevronDownIcon} />
              </SelectTrigger>
              <SelectPortal>
                <SelectBackdrop />
                <SelectContent className="pb-10">
                  <SelectDragIndicatorWrapper>
                    <SelectDragIndicator />
                  </SelectDragIndicatorWrapper>
                  <SelectItem label="📅 Newest first" value="date-desc" />
                  <SelectItem label="📅 Oldest first" value="date-asc" />
                  <SelectItem label="📝 Name A-Z" value="name-asc" />
                  <SelectItem label="📝 Name Z-A" value="name-desc" />
                  <SelectItem label="🏷️ Status" value="status" />
                  <SelectItem label="📊 Highest mark" value="mark-desc" />
                  <SelectItem label="📊 Lowest mark" value="mark-asc" />
                </SelectContent>
              </SelectPortal>
            </Select>
          </HStack>

          {/* Projects List */}
          <VStack className="gap-1">
            {sortedProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </VStack>
        </VStack>
      </ScrollView>
    </Screen>
  );
}
