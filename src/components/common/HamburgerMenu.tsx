import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

const HamburgerMenu: React.FC = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="border-gray-600 bg-gray-500 text-white hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-gray-500"
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] border-l border-gray-700 bg-black text-white">
        <SheetHeader>
          <SheetTitle className="text-white">Menu</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-2 py-4">
          <Link
            to="/"
            className="cursor-pointer rounded px-2 py-2 text-lg transition-colors duration-200 hover:bg-gray-800 hover:text-[#b5e853]"
          >
            Home
          </Link>
          <Link
            to="/wargames"
            className="cursor-pointer rounded px-2 py-2 text-lg transition-colors duration-200 hover:bg-gray-800 hover:text-[#b5e853]"
          >
            Challenges
          </Link>
          <Link
            to="/quizzes"
            className="cursor-pointer rounded px-2 py-2 text-lg transition-colors duration-200 hover:bg-gray-800 hover:text-[#b5e853]"
          >
            Kahoot
          </Link>
          <span className="sr-only">
            Unfortunately, no one can be told what the Matrix is. You have to see it for yourself.
          </span>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default HamburgerMenu;
