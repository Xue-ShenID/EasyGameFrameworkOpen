var LayerMgr = /** @class */ (function () {
    function LayerMgr() {
    }
    LayerMgr.prototype.init = function (layerEnum, defaultClass, classMap, root) {
        if (root)
            this._root = root;
        this.layerEnum = layerEnum;
        this.defaultType = defaultClass;
        this.classMap = classMap;
        var len = Object.keys(layerEnum).length / 2;
        var layerClassNameAndLayerName;
        var layerName;
        var layer;
        var clas;
        var className;
        for (var i = 0; i < len; i++) {
            layerClassNameAndLayerName = layerEnum[i].split("_");
            className = layerClassNameAndLayerName[0];
            layerName = layerClassNameAndLayerName[1];
            if (!layerName) {
                layerName = className;
            }
            if (classMap && this.classMap.has(className)) {
                clas = this.classMap.get(className);
            }
            else {
                clas = defaultClass;
            }
            layer = new clas();
            layer.onInit(layerName, i, this);
            this.addLayer(layer);
        }
    };
    LayerMgr.prototype.setLayerRoot = function (root) {
        if (!root)
            return;
        this._root = root;
        if (this._layerMap) {
            this._layerMap.forEach(function (value) {
                value.onAdd(root);
            });
        }
    };
    Object.defineProperty(LayerMgr.prototype, "root", {
        get: function () {
            return this._root;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LayerMgr.prototype, "layerMap", {
        get: function () {
            return this._layerMap;
        },
        enumerable: false,
        configurable: true
    });
    LayerMgr.prototype.addLayer = function (layer) {
        if (!this._layerMap) {
            this._layerMap = new Map();
        }
        var layerType = layer.layerType;
        if (this._layerMap.has(layerType)) {
            console.warn("\u3010\u5C42\u7EA7\u7BA1\u7406\u5668\u3011\u91CD\u590D\u6DFB\u52A0\u5C42\u7EA7 type:" + layerType + ",name:" + layer.layerName);
            return false;
        }
        this._layerMap.set(layerType, layer);
        if (this._root) {
            layer.onAdd(this._root);
        }
        return true;
    };
    LayerMgr.prototype.removeLayer = function (layerType) {
        if (!this._layerMap || !this._layerMap.has(layerType)) {
            return false;
        }
        var layer = this._layerMap.get(layerType);
        layer.onDestroy && layer.onDestroy();
        this._layerMap.delete(layerType);
        return true;
    };
    LayerMgr.prototype.hideLayer = function (layerType) {
        var layer = this.getLayerByType(layerType);
        if (layer) {
            layer.onHide();
        }
    };
    LayerMgr.prototype.showLayer = function (layerType) {
        var layer = this.getLayerByType(layerType);
        if (layer) {
            layer.onShow();
        }
    };
    LayerMgr.prototype.addNodeToLayer = function (node, layerType) {
        var layer = this.getLayerByType(layerType);
        if (layer) {
            layer.onNodeAdd(node);
        }
    };
    LayerMgr.prototype.getLayerByType = function (layerType) {
        var layer = this._layerMap.get(layerType);
        if (!layer) {
            console.warn("\u3010\u5C42\u7EA7\u7BA1\u7406\u5668\u3011\u6CA1\u6709\u8FD9\u4E2A\u5C42\u7EA7:" + this.layerEnum[layerType] + "," + layerType);
        }
        return layer;
    };
    return LayerMgr;
}());

export { LayerMgr };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXgubWpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGF5ZXItbWdyLnRzIl0sInNvdXJjZXNDb250ZW50IjpbInR5cGUgTGF5ZXJDbGFzc1R5cGUgPSBsYXllci5MYXllckNsYXNzVHlwZTtcblxuZXhwb3J0IGNsYXNzIExheWVyTWdyPFQ+IGltcGxlbWVudHMgbGF5ZXIuSU1ncjxUPiB7XG5cblxuICAgIHByb3RlY3RlZCBsYXllckVudW06IGFueTtcbiAgICBwcm90ZWN0ZWQgY2xhc3NNYXA6IE1hcDxzdHJpbmcsIExheWVyQ2xhc3NUeXBlPjtcbiAgICBwcm90ZWN0ZWQgZGVmYXVsdFR5cGU6IExheWVyQ2xhc3NUeXBlO1xuICAgIHByb3RlY3RlZCBfbGF5ZXJNYXA6IE1hcDxudW1iZXIsIGxheWVyLklMYXllciB8IGFueT47XG4gICAgcHJpdmF0ZSBfcm9vdDogVDtcblxuICAgIHB1YmxpYyBpbml0KGxheWVyRW51bTogYW55LFxuICAgICAgICBkZWZhdWx0Q2xhc3M6IExheWVyQ2xhc3NUeXBlXG4gICAgICAgICwgY2xhc3NNYXA/OiBNYXA8c3RyaW5nLCBMYXllckNsYXNzVHlwZT5cbiAgICAgICAgLCByb290PzogVCkge1xuICAgICAgICBpZiAocm9vdCkgdGhpcy5fcm9vdCA9IHJvb3Q7XG4gICAgICAgIHRoaXMubGF5ZXJFbnVtID0gbGF5ZXJFbnVtO1xuICAgICAgICB0aGlzLmRlZmF1bHRUeXBlID0gZGVmYXVsdENsYXNzO1xuICAgICAgICB0aGlzLmNsYXNzTWFwID0gY2xhc3NNYXA7XG4gICAgICAgIGNvbnN0IGxlbiA9IE9iamVjdC5rZXlzKGxheWVyRW51bSkubGVuZ3RoIC8gMjtcbiAgICAgICAgbGV0IGxheWVyQ2xhc3NOYW1lQW5kTGF5ZXJOYW1lOiBzdHJpbmdbXTtcbiAgICAgICAgbGV0IGxheWVyTmFtZTogc3RyaW5nO1xuICAgICAgICBsZXQgbGF5ZXI6IGxheWVyLklMYXllcjtcbiAgICAgICAgbGV0IGNsYXM6IExheWVyQ2xhc3NUeXBlO1xuICAgICAgICBsZXQgY2xhc3NOYW1lOiBzdHJpbmc7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIGxheWVyQ2xhc3NOYW1lQW5kTGF5ZXJOYW1lID0gbGF5ZXJFbnVtW2ldLnNwbGl0KFwiX1wiKTtcbiAgICAgICAgICAgIGNsYXNzTmFtZSA9IGxheWVyQ2xhc3NOYW1lQW5kTGF5ZXJOYW1lWzBdO1xuICAgICAgICAgICAgbGF5ZXJOYW1lID0gbGF5ZXJDbGFzc05hbWVBbmRMYXllck5hbWVbMV1cbiAgICAgICAgICAgIGlmICghbGF5ZXJOYW1lKSB7XG4gICAgICAgICAgICAgICAgbGF5ZXJOYW1lID0gY2xhc3NOYW1lO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNsYXNzTWFwICYmIHRoaXMuY2xhc3NNYXAuaGFzKGNsYXNzTmFtZSkpIHtcbiAgICAgICAgICAgICAgICBjbGFzID0gdGhpcy5jbGFzc01hcC5nZXQoY2xhc3NOYW1lKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY2xhcyA9IGRlZmF1bHRDbGFzcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxheWVyID0gbmV3IGNsYXMoKTtcbiAgICAgICAgICAgIGxheWVyLm9uSW5pdChsYXllck5hbWUsIGksIHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5hZGRMYXllcihsYXllcik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcHVibGljIHNldExheWVyUm9vdChyb290OiBUKTogdm9pZCB7XG4gICAgICAgIGlmICghcm9vdCkgcmV0dXJuO1xuICAgICAgICB0aGlzLl9yb290ID0gcm9vdDtcbiAgICAgICAgaWYgKHRoaXMuX2xheWVyTWFwKSB7XG4gICAgICAgICAgICB0aGlzLl9sYXllck1hcC5mb3JFYWNoKCh2YWx1ZTogbGF5ZXIuSUxheWVyKSA9PiB7XG4gICAgICAgICAgICAgICAgdmFsdWUub25BZGQocm9vdCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgfVxuICAgIHB1YmxpYyBnZXQgcm9vdCgpOiBUIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Jvb3Q7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBsYXllck1hcCgpOiBNYXA8bnVtYmVyLCBsYXllci5JTGF5ZXIgfCBhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xheWVyTWFwO1xuICAgIH1cbiAgICBwdWJsaWMgYWRkTGF5ZXIobGF5ZXI6IGxheWVyLklMYXllcik6IGJvb2xlYW4ge1xuICAgICAgICBpZiAoIXRoaXMuX2xheWVyTWFwKSB7XG4gICAgICAgICAgICB0aGlzLl9sYXllck1hcCA9IG5ldyBNYXAoKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBsYXllclR5cGUgPSBsYXllci5sYXllclR5cGU7XG4gICAgICAgIGlmICh0aGlzLl9sYXllck1hcC5oYXMobGF5ZXJUeXBlKSkge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKGDjgJDlsYLnuqfnrqHnkIblmajjgJHph43lpI3mt7vliqDlsYLnuqcgdHlwZToke2xheWVyVHlwZX0sbmFtZToke2xheWVyLmxheWVyTmFtZX1gKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9sYXllck1hcC5zZXQobGF5ZXJUeXBlLCBsYXllcik7XG4gICAgICAgIGlmICh0aGlzLl9yb290KSB7XG4gICAgICAgICAgICBsYXllci5vbkFkZCh0aGlzLl9yb290KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcHVibGljIHJlbW92ZUxheWVyKGxheWVyVHlwZTogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgICAgIGlmICghdGhpcy5fbGF5ZXJNYXAgfHwgIXRoaXMuX2xheWVyTWFwLmhhcyhsYXllclR5cGUpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbGF5ZXI6IGxheWVyLklMYXllciA9IHRoaXMuX2xheWVyTWFwLmdldChsYXllclR5cGUpO1xuICAgICAgICBsYXllci5vbkRlc3Ryb3kgJiYgbGF5ZXIub25EZXN0cm95KCk7XG4gICAgICAgIHRoaXMuX2xheWVyTWFwLmRlbGV0ZShsYXllclR5cGUpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcHVibGljIGhpZGVMYXllcihsYXllclR5cGU6IG51bWJlcik6IHZvaWQge1xuICAgICAgICBjb25zdCBsYXllciA9IHRoaXMuZ2V0TGF5ZXJCeVR5cGUobGF5ZXJUeXBlKTtcbiAgICAgICAgaWYgKGxheWVyKSB7XG4gICAgICAgICAgICBsYXllci5vbkhpZGUoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBwdWJsaWMgc2hvd0xheWVyKGxheWVyVHlwZTogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGxheWVyID0gdGhpcy5nZXRMYXllckJ5VHlwZShsYXllclR5cGUpO1xuICAgICAgICBpZiAobGF5ZXIpIHtcbiAgICAgICAgICAgIGxheWVyLm9uU2hvdygpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHB1YmxpYyBhZGROb2RlVG9MYXllcihub2RlOiBULCBsYXllclR5cGU6IG51bWJlcik6IHZvaWQge1xuICAgICAgICBjb25zdCBsYXllciA9IHRoaXMuZ2V0TGF5ZXJCeVR5cGUobGF5ZXJUeXBlKTtcbiAgICAgICAgaWYgKGxheWVyKSB7XG4gICAgICAgICAgICBsYXllci5vbk5vZGVBZGQobm9kZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0TGF5ZXJCeVR5cGU8VCBleHRlbmRzIGxheWVyLklMYXllcj4obGF5ZXJUeXBlOiBudW1iZXIpOiBUIHtcbiAgICAgICAgY29uc3QgbGF5ZXIgPSB0aGlzLl9sYXllck1hcC5nZXQobGF5ZXJUeXBlKTtcbiAgICAgICAgaWYgKCFsYXllcikge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKGDjgJDlsYLnuqfnrqHnkIblmajjgJHmsqHmnInov5nkuKrlsYLnuqc6JHt0aGlzLmxheWVyRW51bVtsYXllclR5cGVdfSwke2xheWVyVHlwZX1gKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbGF5ZXI7XG4gICAgfVxuXG5cbn0iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtJQUVBO0tBNEdDO0lBbkdVLHVCQUFJLEdBQVgsVUFBWSxTQUFjLEVBQ3RCLFlBQTRCLEVBQzFCLFFBQXNDLEVBQ3RDLElBQVE7UUFDVixJQUFJLElBQUk7WUFBRSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUM1QixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUMzQixJQUFJLENBQUMsV0FBVyxHQUFHLFlBQVksQ0FBQztRQUNoQyxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QixJQUFNLEdBQUcsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDOUMsSUFBSSwwQkFBb0MsQ0FBQztRQUN6QyxJQUFJLFNBQWlCLENBQUM7UUFDdEIsSUFBSSxLQUFtQixDQUFDO1FBQ3hCLElBQUksSUFBb0IsQ0FBQztRQUN6QixJQUFJLFNBQWlCLENBQUM7UUFDdEIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUMxQiwwQkFBMEIsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3JELFNBQVMsR0FBRywwQkFBMEIsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMxQyxTQUFTLEdBQUcsMEJBQTBCLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFDekMsSUFBSSxDQUFDLFNBQVMsRUFBRTtnQkFDWixTQUFTLEdBQUcsU0FBUyxDQUFDO2FBQ3pCO1lBQ0QsSUFBSSxRQUFRLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFH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
