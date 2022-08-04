import React from "react";
import { Conteudo } from "../../lib/conteudo";
import { PageContainer } from "../page-container";
import { Sidebar } from "../sidebar";

interface AppLayoutProps {
  conteudoSidebar: Conteudo;
  children: React.ReactNode;
}

export default function AppLayout({ conteudoSidebar, children }: AppLayoutProps) {
  return (
    <PageContainer>
      <Sidebar title={"Conteúdo"} conteudo={conteudoSidebar}></Sidebar>
      {children}
    </PageContainer>
  );
}