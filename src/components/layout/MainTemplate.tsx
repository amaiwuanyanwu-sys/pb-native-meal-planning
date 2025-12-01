import { ReactNode } from 'react';
import MainNavigation from '../navigation/MainNavigation';

interface MainTemplateProps {
  children: ReactNode;
  leftSidebar?: ReactNode;
  rightSidebar?: ReactNode;
  showMainNav?: boolean;
  maxWidth?: string;
}

const MainTemplate = ({
  children,
  leftSidebar,
  rightSidebar,
  showMainNav = true,
  maxWidth = '900px',
}: MainTemplateProps) => {
  return (
    <div className="flex h-screen overflow-hidden bg-[#F8F9F9]">
      {/* Main Navigation */}
      {showMainNav && <MainNavigation />}

      {/* Content Area - Flex container for sidebars and main content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        {leftSidebar}

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto">
            <div
              className="mx-auto px-6 py-12"
              style={{ maxWidth }}
            >
              {children}
            </div>
          </div>
        </main>

        {/* Right Sidebar */}
        {rightSidebar}
      </div>
    </div>
  );
};

export default MainTemplate;
