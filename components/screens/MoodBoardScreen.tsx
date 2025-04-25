import { VStack } from "../ui/vstack";
import { HStack } from "../ui/hstack";
import { Box } from "../ui/box";
import { Center } from "../ui/center";
import { Divider } from "../ui/divider";
import { Card } from "../ui/card";
import { Button, ButtonText, ButtonIcon } from "../ui/button";
import { Text } from "../ui/text";
import { Input, InputField } from "../ui/input";
import { Checkbox, CheckboxIndicator, CheckboxLabel } from "../ui/checkbox";
import { Switch } from "../ui/switch";
import {
  Avatar,
  AvatarBadge,
  AvatarFallbackText,
  AvatarImage,
} from "../ui/avatar";
import { Badge, BadgeText } from "../ui/badge";
import { ScrollView } from "../ui/scroll-view";
import React from "react";

export default function MoodBoardScreen() {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <Box className="flex-1 bg-background-50 p-4">
        <VStack space="lg">
          <Text size="xl" bold className="mb-2">
            MoodBoard: GluestackUI Core Components
          </Text>
          <Divider />
          {/* Buttons */}
          <VStack space="md">
            <Text size="lg" bold>
              Buttons
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <HStack space="md">
                <Button action="primary">
                  <ButtonText>Primary</ButtonText>
                </Button>
                <Button action="secondary">
                  <ButtonText>Secondary</ButtonText>
                </Button>
                <Button action="positive">
                  <ButtonText>Positive</ButtonText>
                </Button>
                <Button action="negative">
                  <ButtonText>Negative</ButtonText>
                </Button>
                <Button variant="outline">
                  <ButtonText>Outline</ButtonText>
                </Button>
                <Button variant="link">
                  <ButtonText>Link</ButtonText>
                </Button>
              </HStack>
            </ScrollView>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <HStack space="md">
                <Button size="sm">
                  <ButtonText>Small</ButtonText>
                </Button>
                <Button size="md">
                  <ButtonText>Medium</ButtonText>
                </Button>
                <Button size="lg">
                  <ButtonText>Large</ButtonText>
                </Button>
              </HStack>
            </ScrollView>
          </VStack>
          <Divider />
          {/* Text */}
          <VStack space="sm">
            <Text size="lg" bold>
              Text
            </Text>
            <Text size="xs">Extra Small</Text>
            <Text size="sm">Small</Text>
            <Text size="md">Medium</Text>
            <Text size="lg">Large</Text>
            <Text size="xl">Extra Large</Text>
            <Text bold>Bold</Text>
            <Text italic>Italic</Text>
            <Text underline>Underline</Text>
            <Text strikeThrough>StrikeThrough</Text>
          </VStack>
          <Divider />
          {/* Input */}
          <VStack space="sm">
            <Text size="lg" bold>
              Input
            </Text>
            <Input variant="outline" size="md">
              <InputField placeholder="Outline" />
            </Input>
            <Input variant="underlined" size="md">
              <InputField placeholder="Underlined" />
            </Input>
            <Input variant="rounded" size="md">
              <InputField placeholder="Rounded" />
            </Input>
          </VStack>
          <Divider />
          {/* Checkbox & Switch */}
          <HStack space="xl">
            <VStack space="sm">
              <Text size="lg" bold>
                Checkbox
              </Text>
              <Checkbox size="sm" value="small">
                <CheckboxIndicator />
                <CheckboxLabel>Small</CheckboxLabel>
              </Checkbox>
              <Checkbox size="md" value="medium">
                <CheckboxIndicator />
                <CheckboxLabel>Medium</CheckboxLabel>
              </Checkbox>
              <Checkbox size="lg" value="large">
                <CheckboxIndicator />
                <CheckboxLabel>Large</CheckboxLabel>
              </Checkbox>
            </VStack>
            <VStack space="sm">
              <Text size="lg" bold>
                Switch
              </Text>
              <Switch size="sm" />
              <Switch size="md" />
              <Switch size="lg" />
            </VStack>
          </HStack>
          <Divider />
          {/* Avatar */}
          <VStack space="sm">
            <Text size="lg" bold>
              Avatar
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <HStack space="md">
                <Avatar size="sm">
                  <AvatarImage source={{ uri: "https://i.pravatar.cc/100" }} />
                  <AvatarFallbackText>AB</AvatarFallbackText>
                </Avatar>
                <Avatar size="md">
                  <AvatarImage source={{ uri: "https://i.pravatar.cc/150" }} />
                  <AvatarFallbackText>CD</AvatarFallbackText>
                </Avatar>
                <Avatar size="lg">
                  <AvatarImage source={{ uri: "https://i.pravatar.cc/200" }} />
                  <AvatarFallbackText>EF</AvatarFallbackText>
                  <AvatarBadge />
                </Avatar>
              </HStack>
            </ScrollView>
          </VStack>
          <Divider />
          {/* Badge */}
          <VStack space="sm">
            <Text size="lg" bold>
              Badge
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <HStack space="md">
                <Badge action="success">
                  <BadgeText>Success</BadgeText>
                </Badge>
                <Badge action="error">
                  <BadgeText>Error</BadgeText>
                </Badge>
                <Badge action="warning">
                  <BadgeText>Warning</BadgeText>
                </Badge>
                <Badge action="info">
                  <BadgeText>Info</BadgeText>
                </Badge>
                <Badge action="muted">
                  <BadgeText>Muted</BadgeText>
                </Badge>
              </HStack>
            </ScrollView>
          </VStack>
          <Divider />
          {/* Card */}
          <VStack space="sm">
            <Text size="lg" bold>
              Card
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <HStack space="md">
                <Card variant="elevated" className="p-4 w-32">
                  <Text>Elevated</Text>
                </Card>
                <Card variant="outline" className="p-4 w-32">
                  <Text>Outline</Text>
                </Card>
                <Card variant="filled" className="p-4 w-32">
                  <Text>Filled</Text>
                </Card>
              </HStack>
            </ScrollView>
          </VStack>
        </VStack>
      </Box>
    </ScrollView>
  );
}
