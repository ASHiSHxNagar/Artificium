// icons
import Creative_Assets from "../../assets/icons/creative_assets.svg";
import Developer_Tools from "../../assets/icons/developer_tools.svg";
import Content_Creation from "../../assets/icons/content_creation.svg";
import Idea_Generation from "../../assets/icons/idea_generation.svg";
import arrowIcon from "../../assets/icons/arrow_right.svg";

export default function InnovationStarterPack() {
  return (
    <div className="w-full px-8 py-4 text-white max-h-[calc(100vh-350px)] overflow-y-scroll">
      {/* Heading */}
      <h2 className="text-[28px] font-medium mb-2 text-center">
        Innovation Starter Pack
      </h2>

      {/* Subheading / Paragraph */}
      <p className="text-sm text-noble-black-300 mb-8 text-center py-1">
        Kickstart your innovation process with our comprehensive selection of
        predefined prompts.
      </p>

      {/* 4-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* ======= Column 1: Creative Assets ======= */}
        <div className="flex flex-col items-center">
          {/* Glassy, glowing circle with icon */}
          <div
            className="
              w-15 h-15 rounded-full mb-4
              flex items-center justify-center
              bg-[linear-gradient(117.58deg,rgba(215,237,237,0.16)_-47.79%,rgba(204,235,235,0)_100%)]
              backdrop-blur-sm
              shadow-[0_0_64px_0_#B6F09C29]
            "
          >
            <img src={Creative_Assets} alt="Icon" className="w-5 h-5" />
          </div>

          {/* Column title */}
          <h3 className="text-base font-medium mb-5 mt-2">Creative Assets</h3>

          {/* Menu items */}
          <div className="flex flex-col w-full space-y-2">
            {/* Item 1 */}
            <div
              className="
                bg-[linear-gradient(117.58deg,rgba(215,237,237,0.16)_-47.79%,rgba(204,235,235,0)_100%)]
                backdrop-blur-sm
                border-t border-[#FFFFFF14]
                p-3 rounded-xl
                flex items-center justify-between
                cursor-pointer
              "
            >
              <span className="text-[14px] text-noble-black-200">
                UI wireframe
              </span>
              <img src={arrowIcon} alt="Arrow" className="w-4 h-4" />
            </div>
            {/* Item 2 */}
            <div
              className="
                bg-[linear-gradient(117.58deg,rgba(215,237,237,0.16)_-47.79%,rgba(204,235,235,0)_100%)]
                backdrop-blur-sm
                border-t border-[#FFFFFF14]
                p-3 rounded-xl
                flex items-center justify-between
                cursor-pointer
              "
            >
              <span className="text-[14px] text-noble-black-200">
                Brochure design
              </span>
              <img src={arrowIcon} alt="Arrow" className="w-4 h-4" />
            </div>
            {/* Item 3 */}
            <div
              className="
                bg-[linear-gradient(117.58deg,rgba(215,237,237,0.16)_-47.79%,rgba(204,235,235,0)_100%)]
                backdrop-blur-sm
                border-t border-[#FFFFFF14]
                p-3 rounded-xl
                flex items-center justify-between
                cursor-pointer
              "
            >
              <span className="text-[14px] text-noble-black-200">
                Social media
              </span>
              <img src={arrowIcon} alt="Arrow" className="w-4 h-4" />
            </div>
            {/* Item 4 */}
            <div
              className="
                bg-[linear-gradient(117.58deg,rgba(215,237,237,0.16)_-47.79%,rgba(204,235,235,0)_100%)]
                backdrop-blur-sm
                border-t border-[#FFFFFF14]
                p-3 rounded-xl
                flex items-center justify-between
                cursor-pointer
              "
            >
              <span className="text-[14px] text-noble-black-200">
                Brand guidelines
              </span>
              <img src={arrowIcon} alt="Arrow" className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* ======= Column 2: Developer Tools ======= */}
        <div className="flex flex-col items-center">
          {/* Glassy icon */}
          <div
            className="
              w-15 h-15 rounded-full mb-4
              flex items-center justify-center
              bg-[linear-gradient(117.58deg,rgba(215,237,237,0.16)_-47.79%,rgba(204,235,235,0)_100%)]
              backdrop-blur-sm
              shadow-[0_0_64px_0_#82DBF729]
            "
          >
            <img src={Developer_Tools} alt="Icon" className="w-5 h-5" />
          </div>

          <h3 className="text-base font-medium mb-5 mt-2">Developer Tools</h3>

          <div className="flex flex-col w-full space-y-2">
            <div
              className="
                bg-[linear-gradient(117.58deg,rgba(215,237,237,0.16)_-47.79%,rgba(204,235,235,0)_100%)]
                backdrop-blur-sm
                border-t border-[#FFFFFF14]
                p-3 rounded-xl
                flex items-center justify-between
                cursor-pointer
              "
            >
              <span className="text-[14px] text-noble-black-200">
                API Integration
              </span>
              <img src={arrowIcon} alt="Arrow" className="w-4 h-4" />
            </div>
            <div
              className="
                bg-[linear-gradient(117.58deg,rgba(215,237,237,0.16)_-47.79%,rgba(204,235,235,0)_100%)]
                backdrop-blur-sm
                border-t border-[#FFFFFF14]
                p-3 rounded-xl
                flex items-center justify-between
                cursor-pointer
              "
            >
              <span className="text-[14px] text-noble-black-200">
                Test automation
              </span>
              <img src={arrowIcon} alt="Arrow" className="w-4 h-4" />
            </div>
            <div
              className="
                bg-[linear-gradient(117.58deg,rgba(215,237,237,0.16)_-47.79%,rgba(204,235,235,0)_100%)]
                backdrop-blur-sm
                border-t border-[#FFFFFF14]
                p-3 rounded-xl
                flex items-center justify-between
                cursor-pointer
              "
            >
              <span className="text-[14px] text-noble-black-200">
                DB optimization
              </span>
              <img src={arrowIcon} alt="Arrow" className="w-4 h-4" />
            </div>
            <div
              className="
                bg-[linear-gradient(117.58deg,rgba(215,237,237,0.16)_-47.79%,rgba(204,235,235,0)_100%)]
                backdrop-blur-sm
                border-t border-[#FFFFFF14]
                p-3 rounded-xl
                flex items-center justify-between
                cursor-pointer
              "
            >
              <span className="text-[14px] text-noble-black-200">
                Code review
              </span>
              <img src={arrowIcon} alt="Arrow" className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* ======= Column 3: Content Creation ======= */}
        <div className="flex flex-col items-center">
          <div
            className="
              w-15 h-15 rounded-full mb-4
              flex items-center justify-center
              bg-[linear-gradient(117.58deg,rgba(215,237,237,0.16)_-47.79%,rgba(204,235,235,0)_100%)]
              backdrop-blur-sm
              shadow-[0_0_64px_0_#BD9AF829]
            "
          >
            <img src={Content_Creation} alt="Icon" className="w-5 h-5" />
          </div>

          <h3 className="text-base font-medium mb-5 mt-2">Content Creation</h3>

          <div className="flex flex-col w-full space-y-2">
            <div
              className="
                bg-[linear-gradient(117.58deg,rgba(215,237,237,0.16)_-47.79%,rgba(204,235,235,0)_100%)]
                backdrop-blur-sm
                border-t border-[#FFFFFF14]
                p-3 rounded-xl
                flex items-center justify-between
                cursor-pointer
              "
            >
              <span className="text-[14px] text-noble-black-200">
                Product description
              </span>
              <img src={arrowIcon} alt="Arrow" className="w-4 h-4" />
            </div>
            <div
              className="
                bg-[linear-gradient(117.58deg,rgba(215,237,237,0.16)_-47.79%,rgba(204,235,235,0)_100%)]
                backdrop-blur-sm
                border-t border-[#FFFFFF14]
                p-3 rounded-xl
                flex items-center justify-between
                cursor-pointer
              "
            >
              <span className="text-[14px] text-noble-black-200">
                E-mail copy
              </span>
              <img src={arrowIcon} alt="Arrow" className="w-4 h-4" />
            </div>
            <div
              className="
                bg-[linear-gradient(117.58deg,rgba(215,237,237,0.16)_-47.79%,rgba(204,235,235,0)_100%)]
                backdrop-blur-sm
                border-t border-[#FFFFFF14]
                p-3 rounded-xl
                flex items-center justify-between
                cursor-pointer
              "
            >
              <span className="text-[14px] text-noble-black-200">
                Whitepaper
              </span>
              <img src={arrowIcon} alt="Arrow" className="w-4 h-4" />
            </div>
            <div
              className="
                bg-[linear-gradient(117.58deg,rgba(215,237,237,0.16)_-47.79%,rgba(204,235,235,0)_100%)]
                backdrop-blur-sm
                border-t border-[#FFFFFF14]
                p-3 rounded-xl
                flex items-center justify-between
                cursor-pointer
              "
            >
              <span className="text-[14px] text-noble-black-200">
                Press release
              </span>
              <img src={arrowIcon} alt="Arrow" className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* ======= Column 4: Idea Generation ======= */}
        <div className="flex flex-col items-center">
          <div
            className="
              w-15 h-15 rounded-full mb-4
              flex items-center justify-center
              bg-[linear-gradient(117.58deg,rgba(215,237,237,0.16)_-47.79%,rgba(204,235,235,0)_100%)]
              backdrop-blur-sm
              shadow-[0_0_64px_0_#FFD14729]
            "
          >
            <img src={Idea_Generation} alt="Icon" className="w-5 h-5" />
          </div>

          <h3 className="text-base font-medium mb-5 mt-2">Idea Generation</h3>

          <div className="flex flex-col w-full space-y-2">
            <div
              className="
                bg-[linear-gradient(117.58deg,rgba(215,237,237,0.16)_-47.79%,rgba(204,235,235,0)_100%)]
                backdrop-blur-sm
                border-t border-[#FFFFFF14]
                p-3 rounded-xl
                flex items-center justify-between
                cursor-pointer
              "
            >
              <span className="text-[14px] text-noble-black-200">
                Hashtag ideas
              </span>
              <img src={arrowIcon} alt="Arrow" className="w-4 h-4" />
            </div>
            <div
              className="
                bg-[linear-gradient(117.58deg,rgba(215,237,237,0.16)_-47.79%,rgba(204,235,235,0)_100%)]
                backdrop-blur-sm
                border-t border-[#FFFFFF14]
                p-3 rounded-xl
                flex items-center justify-between
                cursor-pointer
              "
            >
              <span className="text-[14px] text-noble-black-200">
                Brainstorming
              </span>
              <img src={arrowIcon} alt="Arrow" className="w-4 h-4" />
            </div>
            <div
              className="
                bg-[linear-gradient(117.58deg,rgba(215,237,237,0.16)_-47.79%,rgba(204,235,235,0)_100%)]
                backdrop-blur-sm
                border-t border-[#FFFFFF14]
                p-3 rounded-xl
                flex items-center justify-between
                cursor-pointer
              "
            >
              <span className="text-[14px] text-noble-black-200">
                Trend analysis
              </span>
              <img src={arrowIcon} alt="Arrow" className="w-4 h-4" />
            </div>
            <div
              className="
                bg-[linear-gradient(117.58deg,rgba(215,237,237,0.16)_-47.79%,rgba(204,235,235,0)_100%)]
                backdrop-blur-sm
                border-t border-[#FFFFFF14]
                p-3 rounded-xl
                flex items-center justify-between
                cursor-pointer
              "
            >
              <span className="text-[14px] text-noble-black-200">
                Social media posts
              </span>
              <img src={arrowIcon} alt="Arrow" className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
