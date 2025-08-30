import { MusicalNoteIcon, GlobeAltIcon } from '@heroicons/react/24/solid';
import { CodeBracketIcon, UserIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-8 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <MusicalNoteIcon className="w-6 h-6 text-amber-500" />
              <span className="font-semibold text-lg text-stone-900 dark:text-stone-100">
                Lyrichords
              </span>
            </div>
            <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              Your personal songbook for lyrics and guitar chords. Create,
              organize, and practice your favorite songs.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="font-semibold text-stone-900 dark:text-stone-100">
              Quick Actions
            </h3>
            <div className="flex flex-col gap-2">
              <Link
                href="/songs/new"
                className="text-sm text-stone-600 dark:text-stone-400 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-200 flex items-center gap-2"
              >
                <MusicalNoteIcon className="w-4 h-4" />
                Add New Song
              </Link>
              <button
                onClick={() => {
                  const searchInput = document.querySelector(
                    '#song-search'
                  ) as HTMLInputElement;
                  if (searchInput) {
                    searchInput.scrollIntoView({
                      behavior: 'smooth',
                      block: 'center',
                    });
                    searchInput.focus();
                  }
                }}
                className="text-sm text-stone-600 dark:text-stone-400 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-200 flex items-center gap-2"
              >
                <GlobeAltIcon className="w-4 h-4" />
                Browse Songs
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="font-semibold text-stone-900 dark:text-stone-100">
              About
            </h3>
            <div className="flex flex-col gap-2">
              <span className="text-sm text-stone-600 dark:text-stone-400 flex items-center gap-2">
                <CodeBracketIcon className="w-4 h-4" />
                Built with Next.js & Tailwind
              </span>
              <span className="text-sm text-stone-600 dark:text-stone-400 flex items-center gap-2">
                <UserIcon className="w-4 h-4" />
                For musicians by musicians
              </span>
            </div>
          </div>
        </div>

        <div className="border-t border-stone-200 dark:border-stone-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-stone-500 dark:text-stone-500 flex items-center gap-1">
            © 2022-{currentYear} Marie-Hélène Mai • Made for music lovers
          </p>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/mariehmai/lyrichords"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-stone-400 dark:text-stone-500 hover:text-stone-600 dark:hover:text-stone-300 transition-colors duration-200"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
