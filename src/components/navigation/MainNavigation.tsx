import HomeOutlined from '@mui/icons-material/HomeOutlined';
import PersonOutline from '@mui/icons-material/PersonOutline';
import CalendarMonthOutlined from '@mui/icons-material/CalendarMonthOutlined';
import NutritionIcon from '../icons/NutritionPlanIcon';

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  active?: boolean;
}

const PracticeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M17.506 2.5C17.9627 2.5 18.3327 2.87083 18.3327 3.3275V16.6725C18.3312 16.8914 18.2436 17.1008 18.0889 17.2557C17.9342 17.4105 17.7249 17.4983 17.506 17.5H2.49268C2.27336 17.4998 2.0631 17.4125 1.90809 17.2573C1.75308 17.1022 1.66602 16.8918 1.66602 16.6725V3.3275C1.66754 3.10865 1.7551 2.89918 1.90978 2.74435C2.06445 2.58951 2.27383 2.50175 2.49268 2.5H17.506ZM16.666 4.16667H3.33268V15.8333H16.666V4.16667ZM14.9993 12.5V14.1667H4.99935V12.5H14.9993ZM9.99935 5.83333V10.8333H4.99935V5.83333H9.99935ZM14.9993 9.16667V10.8333H11.666V9.16667H14.9993ZM8.33268 7.5H6.66602V9.16667H8.33268V7.5ZM14.9993 5.83333V7.5H11.666V5.83333H14.9993Z"
      fill="currentColor"
    />
  </svg>
);

const NAV_ITEMS: NavItem[] = [
  {
    id: 'home',
    label: 'Home',
    icon: <HomeOutlined sx={{ fontSize: 20 }} />,
    active: false,
  },
  {
    id: 'clients',
    label: 'Clients',
    icon: <PersonOutline sx={{ fontSize: 20 }} />,
    active: false,
  },
  {
    id: 'practice',
    label: 'Practice',
    icon: <PracticeIcon />,
    active: false,
  },
  {
    id: 'schedule',
    label: 'Schedule',
    icon: <CalendarMonthOutlined sx={{ fontSize: 20 }} />,
    active: false,
  },
  {
    id: 'nutrition',
    label: 'Nutrition',
    icon: <NutritionIcon sx={{ fontSize: 20 }} />,
    active: true,
  },
];

const NavDivider = () => (
  <div className="w-[72px] px-[2px] py-[2px]">
    <div className="w-full h-0 border-t border-white/10" />
  </div>
);

const MainNavigation = () => {
  return (
    <div className="w-20 h-full shrink-0 bg-[#01272E] flex flex-col items-center px-1 py-2 gap-1">
      {/* User Section */}
      <div className="flex flex-col items-center justify-center gap-1 h-12 w-[72px] p-1">
        <div className="w-6 h-6 rounded-full overflow-hidden bg-[#385459] flex items-center justify-center">
          <span className="text-white text-[10px] font-semibold">CM</span>
        </div>
        <p className="text-white text-[10px] font-semibold leading-[1.5] text-center">
          Christina
        </p>
      </div>

      {/* Divider */}
      <NavDivider />

      {/* Navigation Items */}
      <nav className="flex flex-col gap-1">
        {NAV_ITEMS.map((item) => (
          <div
            key={item.id}
            className={`flex flex-col items-center justify-center h-[42px] w-[72px] rounded-[4px] cursor-default ${
              item.active
                ? 'bg-[#385459] text-white'
                : 'text-[#C1C9CB]'
            }`}
          >
            <div className={item.active ? 'text-white' : 'text-[#C1C9CB]'}>
              {item.icon}
            </div>
            <p className="text-[10px] font-semibold leading-[1.5] text-center">
              {item.label}
            </p>
          </div>
        ))}
      </nav>

      {/* Bottom Divider */}
      <NavDivider />
    </div>
  );
};

export default MainNavigation;
