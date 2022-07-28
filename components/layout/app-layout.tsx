import React from "react";
import { ContentSummary, getExercisesSummary } from "../../lib/exercises";
import { PageContainer } from "../page-container";
import { Sidebar } from "../sidebar";

interface AppLayoutProps {
  exercisesSummary?: ContentSummary[];
  children: React.ReactNode;
}

export default function AppLayout({ exercisesSummary, children }: AppLayoutProps) {
  return (
    <PageContainer>
      <Sidebar title={"Conteúdo"} items={exercisesSummary || []}></Sidebar>
      {children}
    </PageContainer>
  );
}