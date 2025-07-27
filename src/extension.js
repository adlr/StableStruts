/* extension.js
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, version 2 of the License.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * SPDX-License-Identifier: GPL-2.0
 */
import Meta from 'gi://Meta';

import {Extension, InjectionManager} from 'resource:///org/gnome/shell/extensions/extension.js';

export default class PlainExampleExtension extends Extension {
    constructor(metadata) {
        super(metadata);
        this._injectionManager = new InjectionManager();
    }
    enable() {
        console.log("Stable Struts Enable");
        this._injectionManager.overrideMethod(Meta.Workspace.prototype, 'set_builtin_struts', originalMethod => {
            /* eslint-disable no-invalid-this */
            return function (...args) {
                console.log("set_builtin_struts override called");
                const arr = args[0];
                console.log(`  There are ${arr.length} struts:`);
                let skip = false;
                for (let i = 0; i < arr.length; i++) {
                    const strut = arr[i];
                    const rect = strut.rect;
                    console.log(`  ${rect.x}, ${rect.y}, ${rect.width}, ${rect.height}`);
                    if (i === 0 && rect.x === 0 && rect.y === 0 && rect.height === 32) {
                        skip = true;
                    } else {
                        skip = false;  // if > 1 strut, don't skip
                    }
                }
                if (skip) {
                    console.log("  Skipping call to set_builtin_struts");
                } else {
                    originalMethod.call(this, ...args);
                }
                console.log("done with set_builtin_struts override");
            };
            /* eslint-enable */
        });
    }

    disable() {
        console.log("Stable Struts Disable");
        this._injectionManager.clear();
    }
}
