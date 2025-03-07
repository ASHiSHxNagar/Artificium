import Sidebar from "../components/layout/Sidebar";
import TopNav from "../components/layout/TopNav";

export default function LibraryPage() {
  return (
    <div className="flex h-screen bg-noble-black-700 text-gray-200">
      <Sidebar activeProject="Orbital Odyssey" />

      <div className="flex-1 flex flex-col">
        <TopNav activeTab="library" />

        <div className="p-6 flex-1 overflow-y-auto">
          <h1 className="text-2xl font-semibold mb-4">Library</h1>
          <p className="text-gray-400 mb-8">
            Here you can see images, documents, and ideas.
          </p>

          {/* 3-column grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Column 1: Images */}
            <div className="bg-gray-800 p-4 rounded-lg">
              <h2 className="text-lg font-semibold mb-4">Images</h2>
              <div className="bg-gray-700 p-3 rounded mb-4">
                <h3 className="font-bold">Captain Drake</h3>
                <p className="text-sm text-gray-400">
                  Natural born leader with years of experience in space
                  exploration.
                </p>
                {/* Thumbnails or dummy images here */}
              </div>
              <div className="bg-gray-700 p-3 rounded">
                <h3 className="font-bold">Cosmic Voyager</h3>
                <p className="text-sm text-gray-400">
                  Main spacecraft used by the crew in the story.
                </p>
              </div>
            </div>

            {/* Column 2: Documents */}
            <div className="bg-gray-800 p-4 rounded-lg">
              <h2 className="text-lg font-semibold mb-4">Documents</h2>
              <div className="bg-gray-700 p-3 rounded mb-4">
                <h3 className="font-bold">Character bios</h3>
                <p className="text-sm text-gray-400">
                  3 documents, 43,832 words
                </p>
              </div>
              <div className="bg-gray-700 p-3 rounded mb-4">
                <h3 className="font-bold">Plot outline</h3>
                <p className="text-sm text-gray-400">
                  1 document, 18,745 words
                </p>
              </div>
              <div className="bg-gray-700 p-3 rounded">
                <h3 className="font-bold">Scene descriptions</h3>
                <p className="text-sm text-gray-400">
                  5 documents, 239,992 words
                </p>
              </div>
            </div>

            {/* Column 3: Ideas */}
            <div className="bg-gray-800 p-4 rounded-lg">
              <h2 className="text-lg font-semibold mb-4">Ideas</h2>
              <div className="bg-gray-700 p-3 rounded mb-4">
                <h3 className="font-bold">Concept art</h3>
                <p className="text-sm text-gray-400">
                  Potential new characters or locations.
                </p>
              </div>
              <div className="bg-gray-700 p-3 rounded mb-4">
                <h3 className="font-bold">Potential plot points</h3>
                <p className="text-sm text-gray-400">
                  List of possible arcs for the story.
                </p>
              </div>
              <div className="bg-gray-700 p-3 rounded">
                <h3 className="font-bold">Spin-off ideas</h3>
                <p className="text-sm text-gray-400">
                  Potential collaborations or expansions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
