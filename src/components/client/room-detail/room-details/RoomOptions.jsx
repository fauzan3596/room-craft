import { ChevronDown } from "lucide-react";
import React from "react";

const RoomOptions = ({
  currentWallColor,
  setCurrentWallColor,
  wallTexture,
  floorTexture,
  setWallTexture,
  setFloorTexture,
}) => {
  return (
    <div className="collapse bg-white absolute top-4 left-4 !w-fit">
      <input type="checkbox" />
      <div className="collapse-title font-medium pe-5 pb-1">
        <div className="flex items-center gap-2 justify-between">
          <p className="text-sm">Options</p>
          <ChevronDown className="h-4 w-4" />
        </div>
      </div>
      <div className="collapse-content">
        <div className="flex flex-col gap-2">
          <label className="form-control">
            <div className="label">
              <span className="label-text">Room Colors</span>
            </div>
            <input
              type="color"
              value={currentWallColor}
              onChange={(e) => setCurrentWallColor(e.target.value)}
            />
          </label>
          <label className="form-control">
            <div className="label">
              <span className="label-text">Wall Textures</span>
            </div>
            <select
              className="select select-bordered select-sm max-w-xs"
              value={wallTexture}
              onChange={(e) => setWallTexture(e.target.value)}
            >
              <option value="">No Texture</option>
              <option value="/textures/wood_wall.jpg">Wood Walls</option>
              <option value="/textures/sidingsovietblack_wall.jpg">
                Siding Soviet Black Walls
              </option>
              <option value="/textures/hexagontiles_wall.jpg">
                Hexagon Walls
              </option>
              <option value="/textures/patternedbrick_wall.jpg">
                Patterned Brick Walls
              </option>
              <option value="/textures/plastered_wall.jpg">
                Plastered Walls
              </option>
            </select>
          </label>
          <label className="form-control">
            <div className="label">
              <span className="label-text">Floor Textures</span>
            </div>
            <select
              className="select select-bordered select-sm max-w-xs"
              value={floorTexture}
              onChange={(e) => setFloorTexture(e.target.value)}
            >
              <option value="">No Texture</option>
              <option value="/textures/floorvinyl_floor.jpg">
                Vinyl Floors
              </option>
              <option value="/textures/linoleum_floor.jpg">
                Linoleum Floors
              </option>
              <option value="/textures/vinylchecker_floor.jpg">
                Vinyl Checker Floors
              </option>
              <option value="/textures/granitetiles_floor.jpg">
                Granite Tiles Floors
              </option>
              <option value="/textures/wood_floor.jpg">Wood Floors</option>
            </select>
          </label>
        </div>
      </div>
    </div>
  );
};

export default RoomOptions;
