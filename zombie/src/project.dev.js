window.__require = function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var b = o.split("/");
        b = b[b.length - 1];
        if (!t[b]) {
          var a = "function" == typeof __require && __require;
          if (!u && a) return a(b, !0);
          if (i) return i(b, !0);
          throw new Error("Cannot find module '" + o + "'");
        }
      }
      var f = n[o] = {
        exports: {}
      };
      t[o][0].call(f.exports, function(e) {
        var n = t[o][1][e];
        return s(n || e);
      }, f, f.exports, e, t, n, r);
    }
    return n[o].exports;
  }
  var i = "function" == typeof __require && __require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s;
}({
  Alert: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "72545s/zDBJDZf/21lBYqW2", "Alert");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var WindowManager_1 = require("../manager/WindowManager");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Alert = function(_super) {
      __extends(Alert, _super);
      function Alert() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.contentLabel = null;
        _this.titleLabel = null;
        _this.okBtn = null;
        return _this;
      }
      Alert.prototype.start = function() {
        if (this.contentLabel) {
          this.contentLabel.string = "";
          this.okBtn.node.opacity = 255;
          this.fillData();
        }
      };
      Alert.prototype.onEnable = function() {
        this.fillData();
      };
      Alert.prototype.onBlackClick = function() {
        this.callback && this.callback();
        WindowManager_1.default.instance.close();
      };
      Alert.prototype.fillData = function() {
        if (this.contentLabel && this.node.params) {
          this.node.params.title && (this.titleLabel.string = this.node.params.title);
          this.node.params.content && (this.contentLabel.string = this.node.params.content);
          this.node.params.okCallback && (this.callback = this.node.params.okCallback);
        }
      };
      __decorate([ property(cc.Label) ], Alert.prototype, "contentLabel", void 0);
      __decorate([ property(cc.Label) ], Alert.prototype, "titleLabel", void 0);
      __decorate([ property(cc.Button) ], Alert.prototype, "okBtn", void 0);
      Alert = __decorate([ ccclass ], Alert);
      return Alert;
    }(cc.Component);
    exports.default = Alert;
    cc._RF.pop();
  }, {
    "../manager/WindowManager": "WindowManager"
  } ],
  ArmyUpWin: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "10e5drKxBRAD6jtVRbfw6Id", "ArmyUpWin");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var HttpManager_1 = require("../net/HttpManager");
    var UserManager_1 = require("../data/UserManager");
    var ConfigManager_1 = require("../data/ConfigManager");
    var PlatformManager_1 = require("../platform/PlatformManager");
    var WindowManager_1 = require("./manager/WindowManager");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var ArmyUpWin = function(_super) {
      __extends(ArmyUpWin, _super);
      function ArmyUpWin() {
        var _this = _super.call(this) || this;
        _this.levelLabel = null;
        _this.plusLabel = null;
        _this.expLabel = null;
        _this.nextPlusLabel = null;
        _this.cooldownNode = null;
        _this.readyNode = null;
        _this.expNode = null;
        _this.expPb = null;
        _this.upAdd = 0;
        return _this;
      }
      ArmyUpWin.prototype.onLoad = function() {
        this.staticMachine = new StaticMachine(this);
      };
      ArmyUpWin.prototype.onEnable = function() {
        this.init();
      };
      ArmyUpWin.prototype.onDisable = function() {};
      ArmyUpWin.prototype.init = function() {
        UserManager_1.UserManager.instance.updateTotalLevel();
        var user = UserManager_1.UserManager.instance.user;
        user.resetcooldown > 0 ? this.staticMachine.changeState(ArmyUpCooldownState) : user.totalLevel >= ConfigManager_1.ConfigManager.instance.clientConfig.config.resetLevel ? this.staticMachine.changeState(ArmyUpReadyState) : this.staticMachine.changeState(ArmyUpGrowState);
        this.upAdd = 0;
        for (var key in user.zmobieMap) {
          var zvo = user.zmobieMap[key];
          var value = Math.pow(zvo.config.rebornPara / 100, (zvo.level - 1) / 10);
          this.upAdd += value;
          console.log("pn:", "p" + key);
        }
        this.upAdd = Math.floor(this.upAdd / 9 * 100);
        this.upAdd < 100 && (this.upAdd = 100);
        this.plusLabel.string = 10 * UserManager_1.UserManager.instance.user.resetReward + "%";
        this.levelLabel.string = UserManager_1.UserManager.instance.user.resetTimes.toString();
        this.nextPlusLabel.string = this.upAdd + "%";
        this.expPb.progress = UserManager_1.UserManager.instance.user.totalLevel / ConfigManager_1.ConfigManager.instance.clientConfig.config.resetLevel;
        this.expLabel.string = UserManager_1.UserManager.instance.user.totalLevel + "/" + ConfigManager_1.ConfigManager.instance.clientConfig.config.resetLevel;
      };
      ArmyUpWin.prototype.onLevelUpBtn = function() {
        HttpManager_1.HttpManager.instance.reqHelper.levelUp().then(function(value) {
          WindowManager_1.default.instance.close();
        });
      };
      ArmyUpWin.prototype.playAd = function() {
        PlatformManager_1.PlatformManager.instance.current.playAd(function() {
          UserManager_1.UserManager;
        });
      };
      __decorate([ property(cc.Label) ], ArmyUpWin.prototype, "levelLabel", void 0);
      __decorate([ property(cc.Label) ], ArmyUpWin.prototype, "plusLabel", void 0);
      __decorate([ property(cc.Label) ], ArmyUpWin.prototype, "expLabel", void 0);
      __decorate([ property(cc.Label) ], ArmyUpWin.prototype, "nextPlusLabel", void 0);
      __decorate([ property(cc.Node) ], ArmyUpWin.prototype, "cooldownNode", void 0);
      __decorate([ property(cc.Node) ], ArmyUpWin.prototype, "readyNode", void 0);
      __decorate([ property(cc.Node) ], ArmyUpWin.prototype, "expNode", void 0);
      __decorate([ property(cc.ProgressBar) ], ArmyUpWin.prototype, "expPb", void 0);
      ArmyUpWin = __decorate([ ccclass ], ArmyUpWin);
      return ArmyUpWin;
    }(cc.Component);
    exports.default = ArmyUpWin;
    var StaticMachine = function() {
      function StaticMachine(owner) {
        this.owner = owner;
        this.instanceMap = {};
      }
      StaticMachine.prototype.addGlobalState = function(clazz) {};
      StaticMachine.prototype.changeState = function(clazz) {
        if (this.currentClazz == clazz) return;
        this.currentClazz = clazz;
        this.preState && this.preState.onExit(this.owner);
        this.preState = this.cutState;
        this.instanceMap[clazz] || (this.instanceMap[clazz] = new clazz());
        this.cutState = this.instanceMap[clazz];
        this.cutState.onEnter(this.owner);
      };
      StaticMachine.prototype.isInState = function(state) {
        if (this.currentClazz == state) return true;
        return false;
      };
      StaticMachine.prototype.update = function(dt) {};
      return StaticMachine;
    }();
    var ArmyUpCooldownState = function() {
      function ArmyUpCooldownState() {}
      ArmyUpCooldownState.prototype.onEnter = function(data) {
        this.owner = data;
        this.owner.readyNode.active = false;
        this.owner.cooldownNode.active = true;
        this.owner.expNode.active = false;
        cc.director.getScheduler().schedule(this.update, this, 1);
      };
      ArmyUpCooldownState.prototype.onExit = function(data) {};
      ArmyUpCooldownState.prototype.update = function(dt) {};
      return ArmyUpCooldownState;
    }();
    var ArmyUpReadyState = function() {
      function ArmyUpReadyState() {}
      ArmyUpReadyState.prototype.onEnter = function(data) {
        this.owner = data;
        this.owner.readyNode.active = true;
        this.owner.cooldownNode.active = false;
        this.owner.expNode.active = false;
      };
      ArmyUpReadyState.prototype.onExit = function(data) {};
      return ArmyUpReadyState;
    }();
    var ArmyUpGrowState = function() {
      function ArmyUpGrowState() {}
      ArmyUpGrowState.prototype.onEnter = function(data) {
        this.owner = data;
        this.owner.readyNode.active = false;
        this.owner.cooldownNode.active = false;
        this.owner.expNode.active = true;
      };
      ArmyUpGrowState.prototype.onExit = function(data) {};
      return ArmyUpGrowState;
    }();
    cc._RF.pop();
  }, {
    "../data/ConfigManager": "ConfigManager",
    "../data/UserManager": "UserManager",
    "../net/HttpManager": "HttpManager",
    "../platform/PlatformManager": "PlatformManager",
    "./manager/WindowManager": "WindowManager"
  } ],
  AssetsConfig: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "20543GDeHxLapIA6iTtWIgv", "AssetsConfig");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var AssetsConfig = function() {
      function AssetsConfig() {}
      AssetsConfig.ZOMBIE_ANIMITION = "a2/";
      AssetsConfig.WINDOW = "window/";
      AssetsConfig.SHOP = "shop/";
      AssetsConfig.CONFIG = "config/";
      AssetsConfig.ZOMBIE = "zombie/";
      AssetsConfig.BUFFER = "buffer/";
      AssetsConfig.LANGUAGE = "config/language/";
      return AssetsConfig;
    }();
    exports.AssetsConfig = AssetsConfig;
    cc._RF.pop();
  }, {} ],
  AssetsManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6e14ajEhJ9H6YPe+0NhMA4x", "AssetsManager");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var AssetsManager = function() {
      function AssetsManager() {}
      Object.defineProperty(AssetsManager, "instance", {
        get: function() {
          null == AssetsManager._instance && (AssetsManager._instance = new AssetsManager());
          return AssetsManager._instance;
        },
        enumerable: true,
        configurable: true
      });
      AssetsManager.prototype.loadSpriteFrame = function(target, url) {
        return __awaiter(this, void 0, Promise, function() {
          return __generator(this, function(_a) {
            return [ 2, new Promise(function(res, rej) {
              var targetSprite = target instanceof cc.Sprite ? target : target.getComponent(cc.Sprite);
              cc.loader.loadRes(url, cc.SpriteFrame, function(err, spriteFrame) {
                if (err) {
                  console.error(err);
                  rej(err);
                } else {
                  targetSprite.spriteFrame = spriteFrame;
                  res(spriteFrame);
                }
              });
            }) ];
          });
        });
      };
      AssetsManager.prototype.loadRes = function(url) {
        return __awaiter(this, void 0, Promise, function() {
          return __generator(this, function(_a) {
            return [ 2, new Promise(function(res, rej) {
              cc.loader.loadRes(url, function(err, data) {
                if (err) {
                  console.error(err);
                  rej(err);
                } else res(data);
              });
            }) ];
          });
        });
      };
      AssetsManager.prototype.releaseAllPrefab = function() {};
      AssetsManager.prototype.releaseAllTexture = function() {};
      return AssetsManager;
    }();
    exports.AssetsManager = AssetsManager;
    cc._RF.pop();
  }, {} ],
  Base64: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "5e1bb/2oxpPC73UtkfE6GDC", "Base64");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Base64 = function() {
      function Base64() {}
      Base64.encode = function(input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
        input = Base64.utf8_encode(input);
        while (i < input.length) {
          chr1 = input.charCodeAt(i++);
          chr2 = input.charCodeAt(i++);
          chr3 = input.charCodeAt(i++);
          enc1 = chr1 >> 2;
          enc2 = (3 & chr1) << 4 | chr2 >> 4;
          enc3 = (15 & chr2) << 2 | chr3 >> 6;
          enc4 = 63 & chr3;
          isNaN(chr2) ? enc3 = enc4 = 64 : isNaN(chr3) && (enc4 = 64);
          output = output + Base64.keyStr.charAt(enc1) + Base64.keyStr.charAt(enc2) + Base64.keyStr.charAt(enc3) + Base64.keyStr.charAt(enc4);
        }
        return output;
      };
      Base64.decode = function(input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (i < input.length) {
          enc1 = Base64.keyStr.indexOf(input.charAt(i++));
          enc2 = Base64.keyStr.indexOf(input.charAt(i++));
          enc3 = Base64.keyStr.indexOf(input.charAt(i++));
          enc4 = Base64.keyStr.indexOf(input.charAt(i++));
          chr1 = enc1 << 2 | enc2 >> 4;
          chr2 = (15 & enc2) << 4 | enc3 >> 2;
          chr3 = (3 & enc3) << 6 | enc4;
          output += String.fromCharCode(chr1);
          64 != enc3 && (output += String.fromCharCode(chr2));
          64 != enc4 && (output += String.fromCharCode(chr3));
        }
        output = Base64.utf8_decode(output);
        return output;
      };
      Base64.utf8_encode = function(string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
          var c = string.charCodeAt(n);
          if (c < 128) utftext += String.fromCharCode(c); else if (c > 127 && c < 2048) {
            utftext += String.fromCharCode(c >> 6 | 192);
            utftext += String.fromCharCode(63 & c | 128);
          } else {
            utftext += String.fromCharCode(c >> 12 | 224);
            utftext += String.fromCharCode(c >> 6 & 63 | 128);
            utftext += String.fromCharCode(63 & c | 128);
          }
        }
        return utftext;
      };
      Base64.utf8_decode = function(utftext) {
        var string = "";
        var i = 0;
        var c = 0;
        var c1 = 0;
        var c2 = 0;
        var c3 = 0;
        while (i < utftext.length) {
          c = utftext.charCodeAt(i);
          if (c < 128) {
            string += String.fromCharCode(c);
            i++;
          } else if (c > 191 && c < 224) {
            c2 = utftext.charCodeAt(i + 1);
            string += String.fromCharCode((31 & c) << 6 | 63 & c2);
            i += 2;
          } else {
            c2 = utftext.charCodeAt(i + 1);
            c3 = utftext.charCodeAt(i + 2);
            string += String.fromCharCode((15 & c) << 12 | (63 & c2) << 6 | 63 & c3);
            i += 3;
          }
        }
        return string;
      };
      Base64.keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
      return Base64;
    }();
    exports.Base64 = Base64;
    cc._RF.pop();
  }, {} ],
  BaseStateMachine: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "4cf40boMZpOi4dglM41/sLK", "BaseStateMachine");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var BaseStateMachine = function() {
      function BaseStateMachine(owner) {
        this.owner = owner;
        this.instanceMap = {};
      }
      BaseStateMachine.prototype.addGlobalState = function(clazz) {};
      BaseStateMachine.prototype.changeState = function(clazz) {
        if (this.currentClazz == clazz) return;
        this.currentClazz = clazz;
        this.preState && this.preState.onExit(this.owner);
        this.preState = this.cutState;
        this.instanceMap[clazz] || (this.instanceMap[clazz] = new clazz());
        this.cutState = this.instanceMap[clazz];
        this.cutState.onEnter(this.owner);
      };
      BaseStateMachine.prototype.isInState = function(state) {
        if (this.currentClazz == state) return true;
        return false;
      };
      BaseStateMachine.prototype.update = function(dt) {};
      BaseStateMachine.prototype.getCurrentState = function() {
        return this.cutState;
      };
      return BaseStateMachine;
    }();
    exports.BaseStateMachine = BaseStateMachine;
    cc._RF.pop();
  }, {} ],
  BlockRenderer: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "36d6eqbuo5Oh6Z+DFUTRCWT", "BlockRenderer");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var BlockStateMachine_1 = require("./BlockStateMachine");
    var BlockStates_1 = require("./BlockStates");
    var UserManager_1 = require("../../../Script/data/UserManager");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var BlockRenderer = function(_super) {
      __extends(BlockRenderer, _super);
      function BlockRenderer() {
        var _this = _super.call(this) || this;
        _this.levelLabel = null;
        _this.unlockCostLabel = null;
        _this.costLabel = null;
        _this.rewardLabel = null;
        _this.stagePb = null;
        _this.harvestPb = null;
        _this.lockNode = null;
        _this.growNode = null;
        _this.operationNode = null;
        _this.reawardNode = null;
        _this.goldNode = null;
        _this.unlockGoldNode = null;
        _this.unlockYelewNode = null;
        _this.pbNode = null;
        _this.fastNode = null;
        _this.breakoutNode = null;
        _this.breakoutCostLabel = null;
        _this.infoBg = null;
        _this.staticMachine = new BlockStateMachine_1.default(_this);
        return _this;
      }
      BlockRenderer.prototype.start = function() {
        this.lockNode.opacity = 0;
        this.growNode.opacity = 0;
        this.operationNode.opacity = 0;
        this.reawardNode.opacity = 0;
      };
      BlockRenderer.prototype.update = function(dt) {
        this.staticMachine.update(dt);
      };
      BlockRenderer.prototype.showInfo = function(key) {
        this.info.level > 0 && (key ? this.info.level >= this.info.stageUpMax ? this.staticMachine.changeState(BlockStates_1.BlockStateBreakOut) : this.staticMachine.changeState(BlockStates_1.BlockStateLevelUp) : this.staticMachine.changeState(BlockStates_1.BlockStateGrow));
      };
      BlockRenderer.prototype.initRenderer = function(data, infoBgNode) {
        this.infoBgNode = infoBgNode;
        this.config = data;
        this.staticMachine.changeState(BlockStates_1.BlockStateInit);
      };
      BlockRenderer.prototype.updateData = function(zvo) {
        this.user = UserManager_1.UserManager.instance.user;
        this.info = zvo;
        this.staticMachine.cutState.update();
      };
      BlockRenderer.prototype.rebirth = function() {
        this.staticMachine.changeState(BlockStates_1.BlockStateLock);
      };
      BlockRenderer.prototype.onTouchDown = function() {
        this.staticMachine.isInState(BlockStates_1.BlockStateLevelUp) && (this.intervalKey = setInterval(this.onClick.bind(this), 50));
      };
      BlockRenderer.prototype.onTouchEnd = function() {
        clearInterval(this.intervalKey);
      };
      BlockRenderer.prototype.onClick = function() {
        this.staticMachine.cutState.onClick();
      };
      BlockRenderer.prototype.onCollisionEnter = function(other, self) {
        this.staticMachine.isInState(BlockStates_1.BlockStateGrow) && this.onClick();
      };
      BlockRenderer.FAST_MIN_INTERVAL = 125;
      __decorate([ property(cc.Label) ], BlockRenderer.prototype, "levelLabel", void 0);
      __decorate([ property(cc.Label) ], BlockRenderer.prototype, "unlockCostLabel", void 0);
      __decorate([ property(cc.Label) ], BlockRenderer.prototype, "costLabel", void 0);
      __decorate([ property(cc.Label) ], BlockRenderer.prototype, "rewardLabel", void 0);
      __decorate([ property(cc.ProgressBar) ], BlockRenderer.prototype, "stagePb", void 0);
      __decorate([ property(cc.ProgressBar) ], BlockRenderer.prototype, "harvestPb", void 0);
      __decorate([ property(cc.Node) ], BlockRenderer.prototype, "lockNode", void 0);
      __decorate([ property(cc.Node) ], BlockRenderer.prototype, "growNode", void 0);
      __decorate([ property(cc.Node) ], BlockRenderer.prototype, "operationNode", void 0);
      __decorate([ property(cc.Node) ], BlockRenderer.prototype, "reawardNode", void 0);
      __decorate([ property(cc.Node) ], BlockRenderer.prototype, "goldNode", void 0);
      __decorate([ property(cc.Node) ], BlockRenderer.prototype, "unlockGoldNode", void 0);
      __decorate([ property(cc.Node) ], BlockRenderer.prototype, "unlockYelewNode", void 0);
      __decorate([ property(cc.Node) ], BlockRenderer.prototype, "pbNode", void 0);
      __decorate([ property(cc.Node) ], BlockRenderer.prototype, "fastNode", void 0);
      __decorate([ property(cc.Node) ], BlockRenderer.prototype, "breakoutNode", void 0);
      __decorate([ property(cc.Label) ], BlockRenderer.prototype, "breakoutCostLabel", void 0);
      __decorate([ property(cc.Node) ], BlockRenderer.prototype, "infoBg", void 0);
      BlockRenderer = __decorate([ ccclass ], BlockRenderer);
      return BlockRenderer;
    }(cc.Component);
    exports.default = BlockRenderer;
    cc._RF.pop();
  }, {
    "../../../Script/data/UserManager": "UserManager",
    "./BlockStateMachine": "BlockStateMachine",
    "./BlockStates": "BlockStates"
  } ],
  BlockStateMachine: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0e7c2NgVmZM8YS811AwXj1H", "BlockStateMachine");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var BlockStateMachine = function() {
      function BlockStateMachine(owner) {
        this.owner = owner;
        this.instanceMap = {};
      }
      BlockStateMachine.prototype.changeState = function(clazz) {
        if (this.currentClazz == clazz) return;
        this.currentClazz = clazz;
        this.preState && this.preState.onExit(this.owner);
        this.preState = this.cutState;
        this.instanceMap[clazz] || (this.instanceMap[clazz] = new clazz());
        this.cutState = this.instanceMap[clazz];
        this.cutState.onEnter(this.owner);
      };
      BlockStateMachine.prototype.update = function(dt) {
        this.globalState && this.globalState.update(dt);
      };
      BlockStateMachine.prototype.addGlobalState = function(clazz) {
        if (this.globalState) {
          console.error("\u5df2\u5b58\u5728\u5168\u5c40\u72b6\u6001\u673a");
          return;
        }
        this.globalState = new clazz();
        this.globalState.onEnter(this.owner);
      };
      BlockStateMachine.prototype.isInState = function(state) {
        if (this.currentClazz == state) return true;
        return false;
      };
      BlockStateMachine.prototype.previousState = function() {
        this.preState ? this.changeState(this.preState) : console.error("\u6ca1\u6709\u627e\u5230\u524d\u4e00\u4e2a\u72b6\u6001");
      };
      return BlockStateMachine;
    }();
    exports.default = BlockStateMachine;
    cc._RF.pop();
  }, {} ],
  BlockStates: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "70342FsWLpBerN5OBN2biE2", "BlockStates");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var UserManager_1 = require("../../../Script/data/UserManager");
    var HttpManager_1 = require("../../../Script/net/HttpManager");
    var NumUtils_1 = require("../../../Script/utils/NumUtils");
    var ClientManager_1 = require("../../../Script/data/ClientManager");
    var GoldManager_1 = require("../../../Script/data/GoldManager");
    var EventDispatcher_1 = require("../../../Script/event/EventDispatcher");
    var GameEvent_1 = require("../../../Script/event/GameEvent");
    var AssetsConfig_1 = require("../../../Script/data/config/AssetsConfig");
    var AssetsManager_1 = require("../../../Script/data/AssetsManager");
    var ConfigManager_1 = require("../../../Script/data/ConfigManager");
    var BlockStateInit = function() {
      function BlockStateInit() {}
      BlockStateInit.prototype.onEnter = function(data) {
        var _this = this;
        this.owner = data;
        this.owner.rewardLabel.string = "";
        this.owner.anim || AssetsManager_1.AssetsManager.instance.loadRes(AssetsConfig_1.AssetsConfig.ZOMBIE_ANIMITION + this.owner.config.animationName).then(function(value) {
          _this.owner.anim = cc.instantiate(value);
          _this.owner.growNode.addChild(_this.owner.anim);
        });
      };
      BlockStateInit.prototype.onExit = function(data) {};
      BlockStateInit.prototype.update = function(dt) {
        if (this.owner.info.level > 0) {
          this.owner.info.reward = new Big(this.owner.info.reward).toFixed(0);
          this.owner.staticMachine.changeState(BlockStateGrow);
          this.owner.staticMachine.addGlobalState(BlockStateGlobal);
        } else this.owner.staticMachine.changeState(BlockStateLock);
      };
      BlockStateInit.prototype.onClick = function(data) {};
      return BlockStateInit;
    }();
    exports.BlockStateInit = BlockStateInit;
    var BlockStateLock = function() {
      function BlockStateLock() {}
      BlockStateLock.prototype.onEnter = function(data) {
        this.owner = data;
        this.owner.lockNode.opacity = 255;
        this.owner.growNode.opacity = 0;
        this.owner.operationNode.opacity = 0;
        this.owner.reawardNode.opacity = 0;
        this.owner.currentTime = 0;
        this.owner.rewardLabel.string = "";
        if (this.owner.info) switch (this.owner.info.config.unlockType) {
         case 0:
          this.owner.unlockGoldNode.opacity = 0;
          this.owner.unlockYelewNode.opacity = 0;
          this.owner.unlockCostLabel.node.opacity = 0;
          break;

         case 1:
          this.owner.unlockGoldNode.opacity = 255;
          this.owner.unlockYelewNode.opacity = 0;
          break;

         case 2:
          this.owner.unlockGoldNode.opacity = 0;
          this.owner.unlockYelewNode.opacity = 255;
        }
        this.owner.unlockCostLabel.string = NumUtils_1.NumUtils.num2Coin(this.owner.info.config.unlockPara);
      };
      BlockStateLock.prototype.onExit = function(data) {};
      BlockStateLock.prototype.update = function(dt) {};
      BlockStateLock.prototype.onClick = function(data) {
        var _this = this;
        if (this.owner.user.isEnough(this.owner.info.config.unlockPara)) {
          this.owner.user.subCurrency(this.owner.info.config.unlockPara);
          HttpManager_1.HttpManager.instance.reqHelper.unlock(this.owner.info.id, function() {
            _this.owner.staticMachine.changeState(BlockStateGrow);
            _this.owner.staticMachine.addGlobalState(BlockStateGlobal);
          });
        }
      };
      return BlockStateLock;
    }();
    exports.BlockStateLock = BlockStateLock;
    var BlockStateGrow = function() {
      function BlockStateGrow() {}
      BlockStateGrow.prototype.onEnter = function(data) {
        this.owner = data;
        this.info = data.info;
        this.user = data.user;
        this.owner.operationNode.opacity = 0;
        this.owner.reawardNode.opacity = 255;
        this.owner.growNode.opacity = 255;
        this.owner.lockNode.opacity = 0;
        parseInt(this.owner.info.reward) > 0 && (this.owner.rewardLabel.string = NumUtils_1.NumUtils.num2Coin(this.owner.info.reward));
        this.owner.currentTime = this.info.grow;
        this.checkFastGrow();
      };
      BlockStateGrow.prototype.onExit = function(data) {};
      BlockStateGrow.prototype.update = function(dt) {};
      BlockStateGrow.prototype.onClick = function(data) {
        if (parseInt(this.owner.info.reward) > 0) {
          var user = UserManager_1.UserManager.instance.user;
          user.addCurrency(this.owner.info.reward);
          this.owner.rewardLabel.string = "";
          GoldManager_1.GoldManager.instance.fly2Info(this.owner.node.position);
          ClientManager_1.ClientManager.instance.operationHarvest(this.info.id, this.owner.info.reward);
          this.owner.info.reward = "0";
        }
      };
      BlockStateGrow.prototype.checkFastGrow = function() {
        if (this.owner.info.updateInterval > ConfigManager_1.ConfigManager.instance.clientConfig.config.minGrowInterval) {
          this.owner.harvestPb.node.opacity = 255;
          this.owner.fastNode.opacity = 0;
        } else {
          this.owner.harvestPb.node.opacity = 0;
          this.owner.fastNode.opacity = 255;
        }
      };
      return BlockStateGrow;
    }();
    exports.BlockStateGrow = BlockStateGrow;
    var BlockStateLevelUp = function() {
      function BlockStateLevelUp() {}
      BlockStateLevelUp.prototype.onEnter = function(data) {
        this.owner = data;
        this.owner.lockNode.opacity = 0;
        this.owner.growNode.opacity = 255;
        this.owner.operationNode.opacity = 255;
        this.owner.reawardNode.opacity = 0;
        var point = this.owner.operationNode.parent.convertToWorldSpaceAR(this.owner.operationNode.position);
        this.owner.operationNode.parent = this.owner.infoBgNode;
        this.owner.operationNode.position = this.owner.infoBgNode.convertToNodeSpaceAR(point);
        this.owner.breakoutNode.opacity = 0;
        this.checkEnoughUp();
        this.updateLabelText();
        this.owner.operationNode.on(cc.Node.EventType.TOUCH_START, this.onTouchDown, this);
        this.owner.operationNode.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
      };
      BlockStateLevelUp.prototype.onExit = function(data) {
        this.owner.lockNode.opacity = 0;
        this.owner.growNode.opacity = 255;
        this.owner.operationNode.opacity = 0;
        this.owner.reawardNode.opacity = 255;
        this.owner.operationNode.off(cc.Node.EventType.TOUCH_START, this.onTouchDown, this);
        this.owner.operationNode.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
      };
      BlockStateLevelUp.prototype.update = function(dt) {};
      BlockStateLevelUp.prototype.onClick = function(data) {
        console.log("BlockStateLevelUp");
        var user = UserManager_1.UserManager.instance.user;
        if (user.isEnough(this.owner.info.levelUpCost)) {
          user.addCurrency(this.owner.info.levelUpCost);
          this.owner.info.addLevel();
          ClientManager_1.ClientManager.instance.operationLevelUp(this.owner.info.id, 1);
          this.updateLabelText();
          this.checkEnoughUp();
          EventDispatcher_1.EventDispatcher.trigger(GameEvent_1.GameEvent.BLOCK_INFO_UPDATE);
          this.owner.info.level >= this.owner.info.stageUpMax && this.owner.staticMachine.changeState(BlockStateBreakOut);
        }
      };
      BlockStateLevelUp.prototype.updateLabelText = function() {
        this.owner.levelLabel.string = this.owner.info.level.toString();
        this.owner.costLabel.string = NumUtils_1.NumUtils.num2Coin(this.owner.info.levelUpCost);
        this.owner.stagePb.progress = (this.owner.info.level - this.owner.info.stageUpMin) / (this.owner.info.stageUpMax - this.owner.info.stageUpMin);
      };
      BlockStateLevelUp.prototype.checkEnoughUp = function() {
        this.owner.user.isEnough(this.owner.info.levelUpCost) ? this.owner.infoBg.color = cc.Color.WHITE : this.owner.infoBg.color = cc.Color.GRAY;
      };
      BlockStateLevelUp.prototype.onTouchDown = function() {
        this.intervalKey = setInterval(this.onClick.bind(this), 70);
      };
      BlockStateLevelUp.prototype.onTouchEnd = function() {
        clearInterval(this.intervalKey);
      };
      return BlockStateLevelUp;
    }();
    exports.BlockStateLevelUp = BlockStateLevelUp;
    var BlockStateBreakOut = function() {
      function BlockStateBreakOut() {
        this.isWaite = false;
      }
      BlockStateBreakOut.prototype.onEnter = function(data) {
        this.owner = data;
        this.owner.lockNode.opacity = 0;
        this.owner.growNode.opacity = 255;
        this.owner.operationNode.opacity = 255;
        this.owner.reawardNode.opacity = 0;
        var point = this.owner.operationNode.parent.convertToWorldSpaceAR(this.owner.operationNode.position);
        this.owner.operationNode.parent = this.owner.infoBgNode;
        this.owner.operationNode.position = this.owner.infoBgNode.convertToNodeSpaceAR(point);
        this.owner.breakoutCostLabel.string = NumUtils_1.NumUtils.num2Coin(this.owner.info.stageUpCost);
        this.owner.breakoutNode.opacity = 255;
      };
      BlockStateBreakOut.prototype.onExit = function(data) {
        this.owner.breakoutNode.opacity = 0;
      };
      BlockStateBreakOut.prototype.update = function(dt) {};
      BlockStateBreakOut.prototype.onClick = function(data) {
        return __awaiter(this, void 0, Promise, function() {
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              if (!(false == this.isWaite)) return [ 3, 3 ];
              this.isWaite = true;
              if (!this.owner.user.isEnough(this.owner.info.stageUpCost)) return [ 3, 3 ];
              this.owner.user.subCurrency(this.owner.info.stageUpCost);
              return [ 4, ClientManager_1.ClientManager.instance.syncGorw() ];

             case 1:
              _a.sent();
              return [ 4, HttpManager_1.HttpManager.instance.reqHelper.breakout(this.owner.info.id) ];

             case 2:
              _a.sent();
              this.owner.info.addBreakout();
              this.owner.info.levelUp();
              this.owner.staticMachine.changeState(BlockStateLevelUp);
              this.isWaite = false;
              _a.label = 3;

             case 3:
              return [ 2 ];
            }
          });
        });
      };
      return BlockStateBreakOut;
    }();
    exports.BlockStateBreakOut = BlockStateBreakOut;
    var BlockStateGlobal = function() {
      function BlockStateGlobal() {}
      BlockStateGlobal.prototype.onEnter = function(data) {
        this.owner = data;
        this.user = UserManager_1.UserManager.instance.user;
      };
      BlockStateGlobal.prototype.onExit = function(data) {};
      BlockStateGlobal.prototype.update = function(dt) {
        if (this.owner.info && this.owner.user && this.owner.info.level > 0) {
          if (false == this.owner.info.auto && parseInt(this.owner.info.reward) > 0) return;
          this.owner.currentTime += 1e3 * dt;
          this.owner.info.grow = this.owner.currentTime;
          this.owner.harvestPb.progress = this.owner.info.grow / this.owner.info.updateInterval;
          if (this.owner.info.grow >= this.owner.info.updateInterval) {
            this.owner.currentTime = 0;
            this.owner.info.reward = new Big(this.owner.info.reward).plus(this.owner.info.singleReward).toFixed(0);
            this.owner.rewardLabel.string = NumUtils_1.NumUtils.num2Coin(this.owner.info.reward);
          }
          parseInt(this.owner.info.reward) > 0 ? this.owner.goldNode.opacity = 255 : this.owner.goldNode.opacity = 0;
        }
      };
      BlockStateGlobal.prototype.onClick = function(data) {};
      return BlockStateGlobal;
    }();
    exports.BlockStateGlobal = BlockStateGlobal;
    cc._RF.pop();
  }, {
    "../../../Script/data/AssetsManager": "AssetsManager",
    "../../../Script/data/ClientManager": "ClientManager",
    "../../../Script/data/ConfigManager": "ConfigManager",
    "../../../Script/data/GoldManager": "GoldManager",
    "../../../Script/data/UserManager": "UserManager",
    "../../../Script/data/config/AssetsConfig": "AssetsConfig",
    "../../../Script/event/EventDispatcher": "EventDispatcher",
    "../../../Script/event/GameEvent": "GameEvent",
    "../../../Script/net/HttpManager": "HttpManager",
    "../../../Script/utils/NumUtils": "NumUtils"
  } ],
  BlockView: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "63836rdFBBPpaRAlWbSfGiP", "BlockView");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var EventDispatcher_1 = require("../../Script/event/EventDispatcher");
    var GameEvent_1 = require("../../Script/event/GameEvent");
    var ConfigManager_1 = require("../../Script/data/ConfigManager");
    var UserManager_1 = require("../../Script/data/UserManager");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var BlockView = function(_super) {
      __extends(BlockView, _super);
      function BlockView() {
        var _this = _super.call(this) || this;
        _this.blockPrefab = null;
        _this.upPrefab = null;
        _this.infoBgNode = null;
        _this.isShowInfo = false;
        _this.blockList = [];
        _this.pool = new cc.NodePool("upLabelRenderer");
        return _this;
      }
      BlockView_1 = BlockView;
      BlockView.prototype.onLoad = function() {
        this.infoBgNode.active = false;
        EventDispatcher_1.EventDispatcher.on(GameEvent_1.GameEvent.STATE_ZOMBIE_CHECK, this.changeZmobieState, this);
        EventDispatcher_1.EventDispatcher.on(GameEvent_1.GameEvent.USER_INFO_UPDATE, this.updateInfo, this);
        EventDispatcher_1.EventDispatcher.on(GameEvent_1.GameEvent.USER_REBRITH, this.onRebirth, this);
        for (var i = 0; i < BlockView_1.BLOCK_NUM_MAX; i++) {
          var block = cc.instantiate(this.blockPrefab);
          var img = this.node.getChildByName("b" + (i + 1));
          block.x = img.x;
          block.y = img.y;
          this.node.addChild(block);
          this.node.removeChild(img);
          this.blockList.push(block);
        }
      };
      BlockView.prototype.start = function() {
        this.initBlock(ConfigManager_1.ConfigManager.instance.zombieConfig);
      };
      BlockView.prototype.onDestroy = function() {
        this.pool.clear();
      };
      BlockView.prototype.changeZmobieState = function() {
        var _this = this;
        this.isShowInfo = !this.isShowInfo;
        this.infoBgNode.active = this.isShowInfo;
        this.blockList.forEach(function(element) {
          var renderer = element.getComponent("BlockRenderer");
          renderer.showInfo(_this.isShowInfo);
        });
      };
      BlockView.prototype.initBlock = function(configList) {
        var index = 0;
        for (var key in configList) {
          var node = this.blockList[index];
          if (node) {
            var renderer = node.getComponent("BlockRenderer");
            renderer.initRenderer(configList[key], this.infoBgNode);
          }
          index++;
        }
      };
      BlockView.prototype.updateInfo = function() {
        var index = 1;
        this.blockList.forEach(function(element) {
          var renderer = element.getComponent("BlockRenderer");
          renderer.updateData(UserManager_1.UserManager.instance.user.zmobieMap[index]);
          index++;
        });
      };
      BlockView.prototype.onRebirth = function() {
        var index = 1;
        this.blockList.forEach(function(element) {
          var renderer = element.getComponent("BlockRenderer");
          renderer.rebirth();
          renderer.updateData(UserManager_1.UserManager.instance.user.zmobieMap[index]);
          index++;
        });
      };
      var BlockView_1;
      BlockView.BLOCK_NUM_MAX = 9;
      __decorate([ property(cc.Prefab) ], BlockView.prototype, "blockPrefab", void 0);
      __decorate([ property(cc.Prefab) ], BlockView.prototype, "upPrefab", void 0);
      __decorate([ property(cc.Node) ], BlockView.prototype, "infoBgNode", void 0);
      BlockView = BlockView_1 = __decorate([ ccclass ], BlockView);
      return BlockView;
    }(cc.Component);
    exports.default = BlockView;
    cc._RF.pop();
  }, {
    "../../Script/data/ConfigManager": "ConfigManager",
    "../../Script/data/UserManager": "UserManager",
    "../../Script/event/EventDispatcher": "EventDispatcher",
    "../../Script/event/GameEvent": "GameEvent"
  } ],
  BottomView: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "72e7cwN49BK37906rbz0hAz", "BottomView");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var EventDispatcher_1 = require("../../Script/event/EventDispatcher");
    var GameEvent_1 = require("../../Script/event/GameEvent");
    var WindowConfig_1 = require("../../Script/data/config/WindowConfig");
    var WindowManager_1 = require("../../Script/window/manager/WindowManager");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var BottomView = function(_super) {
      __extends(BottomView, _super);
      function BottomView() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      BottomView.prototype.start = function() {};
      BottomView.prototype.onLevelUpClick = function() {
        EventDispatcher_1.EventDispatcher.trigger(GameEvent_1.GameEvent.STATE_ZOMBIE_CHECK);
      };
      BottomView.prototype.onShopCLick = function() {
        WindowManager_1.default.instance.open(WindowConfig_1.WindowConfig.SHOP);
      };
      BottomView.prototype.cardClick = function() {
        WindowManager_1.default.instance.open(WindowConfig_1.WindowConfig.CARD);
      };
      BottomView = __decorate([ ccclass ], BottomView);
      return BottomView;
    }(cc.Component);
    exports.default = BottomView;
    cc._RF.pop();
  }, {
    "../../Script/data/config/WindowConfig": "WindowConfig",
    "../../Script/event/EventDispatcher": "EventDispatcher",
    "../../Script/event/GameEvent": "GameEvent",
    "../../Script/window/manager/WindowManager": "WindowManager"
  } ],
  BufferConfig: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c28b15RigZBB6hIQLozy3xr", "BufferConfig");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var BufferConfig = function() {
      function BufferConfig() {}
      BufferConfig.DOUBLE_EFFICIENCY = "doubleEfficiency";
      BufferConfig.DOUBLE_REVENUE = "doubleRevenue";
      return BufferConfig;
    }();
    exports.BufferConfig = BufferConfig;
    var ProtoConfig = function() {
      function ProtoConfig() {}
      ProtoConfig.GETCARD_DALIYCARD = "card";
      ProtoConfig.GETCARD_BOMBZOMBIE = "bomb";
      return ProtoConfig;
    }();
    exports.ProtoConfig = ProtoConfig;
    cc._RF.pop();
  }, {} ],
  BufferRenderer: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "675d6fNz0NF2KdfwVRezf66", "BufferRenderer");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var TimeUtils_1 = require("../../Script/utils/TimeUtils");
    var AssetsConfig_1 = require("../../Script/data/config/AssetsConfig");
    var AssetsManager_1 = require("../../Script/data/AssetsManager");
    var WindowManager_1 = require("../../Script/window/manager/WindowManager");
    var EventDispatcher_1 = require("../../Script/event/EventDispatcher");
    var GameEvent_1 = require("../../Script/event/GameEvent");
    var UserManager_1 = require("../../Script/data/UserManager");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var BufferRenderer = function(_super) {
      __extends(BufferRenderer, _super);
      function BufferRenderer() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.iconSprite = null;
        _this.cooldownLabel = null;
        return _this;
      }
      BufferRenderer.prototype.start = function() {};
      BufferRenderer.prototype.fillData = function(data) {
        this.bvo = data;
        if (this.bvo.time > 0) {
          this.cooldownLabel.string = TimeUtils_1.TimeUtils.time2Cooldown(data.time);
          this.cooldownLabel.node.opacity = 255;
          cc.director.getScheduler().schedule(this.updateTime, this, 1);
          this.updateTime();
        } else {
          this.cooldownLabel.string = "";
          this.cooldownLabel.node.opacity = 0;
          cc.director.getScheduler().unschedule(this.updateTime, this);
        }
        data.icon ? AssetsManager_1.AssetsManager.instance.loadSpriteFrame(this.iconSprite, AssetsConfig_1.AssetsConfig.BUFFER + data.icon) : console.error(this.bvo);
      };
      BufferRenderer.prototype.updateTime = function() {
        if (this.bvo.time > 0) {
          this.cooldownLabel.string = TimeUtils_1.TimeUtils.time2Cooldown(this.bvo.time);
          this.bvo.time -= 1e3;
        } else {
          cc.director.getScheduler().unschedule(this.updateTime, this);
          this.cooldownLabel.string = "";
          UserManager_1.UserManager.instance.updateZombieValue();
          EventDispatcher_1.EventDispatcher.trigger(GameEvent_1.GameEvent.BUFFER_UPDATE);
        }
      };
      BufferRenderer.prototype.onClick = function() {
        WindowManager_1.default.instance.open(this.bvo.win);
      };
      __decorate([ property(cc.Sprite) ], BufferRenderer.prototype, "iconSprite", void 0);
      __decorate([ property(cc.Label) ], BufferRenderer.prototype, "cooldownLabel", void 0);
      BufferRenderer = __decorate([ ccclass ], BufferRenderer);
      return BufferRenderer;
    }(cc.Component);
    exports.default = BufferRenderer;
    cc._RF.pop();
  }, {
    "../../Script/data/AssetsManager": "AssetsManager",
    "../../Script/data/UserManager": "UserManager",
    "../../Script/data/config/AssetsConfig": "AssetsConfig",
    "../../Script/event/EventDispatcher": "EventDispatcher",
    "../../Script/event/GameEvent": "GameEvent",
    "../../Script/utils/TimeUtils": "TimeUtils",
    "../../Script/window/manager/WindowManager": "WindowManager"
  } ],
  BufferVo: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "4f7d7vDY+VLPK9PxXLIjdzT", "BufferVo");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var ClientManager_1 = require("../ClientManager");
    var BufferVo = function() {
      function BufferVo() {
        this.time = 0;
        this.endTime = 0;
        this.lastActivate = 0;
      }
      BufferVo.prototype.decode = function(data) {
        this.id = data.id;
        this.name = data.name;
        this.effect = data.effect;
        this.icon = data.icon;
        this.win = data.win;
      };
      BufferVo.prototype.decodeSkill = function(data) {
        this.skill = data;
        var duration = 1e3 * this.skill.para;
        this.endTime > 0 && (this.lastActivate = this.endTime - duration);
      };
      Object.defineProperty(BufferVo.prototype, "bufferEffect", {
        get: function() {
          return this.time > 0 ? this.effect : 0;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(BufferVo.prototype, "todayUsed", {
        get: function() {
          if (new Date(this.lastActivate).toDateString() === new Date(ClientManager_1.ClientManager.instance.serverTime).toDateString()) return true;
          return false;
        },
        enumerable: true,
        configurable: true
      });
      return BufferVo;
    }();
    exports.BufferVo = BufferVo;
    cc._RF.pop();
  }, {
    "../ClientManager": "ClientManager"
  } ],
  CardRenderer: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "11ffaS/vylPVZ1vxLg1mF5F", "CardRenderer");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var NumUtils_1 = require("../../utils/NumUtils");
    var AssetsConfig_1 = require("../../data/config/AssetsConfig");
    var AssetsManager_1 = require("../../data/AssetsManager");
    var LocalizationManager_1 = require("../../data/LocalizationManager");
    var UserManager_1 = require("../../data/UserManager");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var CardRenderer = function(_super) {
      __extends(CardRenderer, _super);
      function CardRenderer() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.nameLabel = null;
        _this.desLabel = null;
        _this.levelLabel = null;
        _this.imgNode = null;
        _this.numNode = null;
        _this.goldNode = null;
        return _this;
      }
      CardRenderer.prototype.onLoad = function() {};
      CardRenderer.prototype.start = function() {};
      CardRenderer.prototype.fillData = function(data) {
        this.info = data;
        this.nameLabel.string = data.name;
        this.desLabel.string = LocalizationManager_1.LocalizationManager.localText("\u4ea7\u91cf+" + UserManager_1.UserManager.instance.user.zmobieMap[this.info.id].cardReward) + "%";
        this.goldNode.opacity = 0;
        AssetsManager_1.AssetsManager.instance.loadSpriteFrame(this.imgNode, AssetsConfig_1.AssetsConfig.ZOMBIE + this.info.url);
      };
      CardRenderer.prototype.fillCoinData = function(num) {
        this.goldNode.opacity = 255;
        this.numNode.opacity = 0;
        this.nameLabel.string = LocalizationManager_1.LocalizationManager.localText("\u91d1\u5e01");
        this.desLabel.string = NumUtils_1.NumUtils.num2Coin(num);
      };
      CardRenderer.prototype.fillNum = function(num) {
        this.levelLabel.string = num.toString();
        this.numNode.opacity = num > 0 ? 255 : 0;
      };
      __decorate([ property(cc.Label) ], CardRenderer.prototype, "nameLabel", void 0);
      __decorate([ property(cc.Label) ], CardRenderer.prototype, "desLabel", void 0);
      __decorate([ property(cc.Label) ], CardRenderer.prototype, "levelLabel", void 0);
      __decorate([ property(cc.Sprite) ], CardRenderer.prototype, "imgNode", void 0);
      __decorate([ property(cc.Node) ], CardRenderer.prototype, "numNode", void 0);
      __decorate([ property(cc.Node) ], CardRenderer.prototype, "goldNode", void 0);
      CardRenderer = __decorate([ ccclass ], CardRenderer);
      return CardRenderer;
    }(cc.Component);
    exports.default = CardRenderer;
    cc._RF.pop();
  }, {
    "../../data/AssetsManager": "AssetsManager",
    "../../data/LocalizationManager": "LocalizationManager",
    "../../data/UserManager": "UserManager",
    "../../data/config/AssetsConfig": "AssetsConfig",
    "../../utils/NumUtils": "NumUtils"
  } ],
  CardVo: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "80dc9dQ5uVBNKopOLbi1wxa", "CardVo");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var CardVo = function() {
      function CardVo() {
        this.reward = 1;
        this.rewardRate = 1;
        this.extra10 = 1;
      }
      CardVo.prototype.decode = function(data) {
        this.id = data.cardId;
        this.name = data.cardName;
        this.reward = data.para0;
        this.rewardRate = data.para1;
        this.extra10 = data.para2;
      };
      CardVo.prototype.decodeClientConfig = function(data) {
        this.desc = data.des;
        this.url = data.img;
      };
      return CardVo;
    }();
    exports.CardVo = CardVo;
    cc._RF.pop();
  }, {} ],
  CardWin: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b88ccMqt7BN9L3o3mdMg+wi", "CardWin");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var UserManager_1 = require("../../data/UserManager");
    var ConfigManager_1 = require("../../data/ConfigManager");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var CardWin = function(_super) {
      __extends(CardWin, _super);
      function CardWin() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.contentNode = null;
        _this.cardPrefab = null;
        return _this;
      }
      CardWin.prototype.onLoad = function() {
        this.rendererList = [];
        this.initConfig();
      };
      CardWin.prototype.initConfig = function() {
        for (var key in ConfigManager_1.ConfigManager.instance.cardConfig) if (void 0 != UserManager_1.UserManager.instance.user.cardMap[key]) {
          var item = cc.instantiate(this.cardPrefab);
          var script = item.getComponent("CardRenderer");
          script.fillData(ConfigManager_1.ConfigManager.instance.cardConfig[key]);
          script.fillNum(UserManager_1.UserManager.instance.user.cardMap[key]);
          this.rendererList.push(item);
          this.contentNode.addChild(item);
        }
      };
      __decorate([ property(cc.Node) ], CardWin.prototype, "contentNode", void 0);
      __decorate([ property(cc.Prefab) ], CardWin.prototype, "cardPrefab", void 0);
      CardWin = __decorate([ ccclass ], CardWin);
      return CardWin;
    }(cc.Component);
    exports.default = CardWin;
    cc._RF.pop();
  }, {
    "../../data/ConfigManager": "ConfigManager",
    "../../data/UserManager": "UserManager"
  } ],
  ClientManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "10c0bjHdWFCypO/QGOeveaF", "ClientManager");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var HttpManager_1 = require("../net/HttpManager");
    var ClientManager = function() {
      function ClientManager() {
        this.token = "";
        this._standardTime = Date.now();
        this._syncTime = 0;
        this.startTime = Date.now();
        this.operationListHavest = [];
        this.operationListLevelUp = [];
        this.offlineReward = {};
        this.blockHistory = {};
        this.blockLastTime = {};
        this.totalOfflineReward = 0;
        this.lastSync = 0;
        this.lastSyncGrow = 0;
        this.lastSyncHavst = 0;
      }
      Object.defineProperty(ClientManager, "instance", {
        get: function() {
          null == ClientManager._instance && (ClientManager._instance = new ClientManager());
          return ClientManager._instance;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(ClientManager.prototype, "serverTime", {
        get: function() {
          this._standardTime = this._standardTime + (Date.now() - this._syncTime);
          return this._standardTime;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(ClientManager.prototype, "standardTime", {
        set: function(value) {
          this._standardTime = value;
          this._syncTime = Date.now();
        },
        enumerable: true,
        configurable: true
      });
      ClientManager.prototype.getTime = function() {
        return Date.now() - this.startTime;
      };
      ClientManager.prototype.operationLevelUp = function(id, level) {
        void 0 === level && (level = 1);
        this.operationListLevelUp[id] || (this.operationListLevelUp[id] = 0);
        this.operationListLevelUp[id] += level;
        this.checkSync();
      };
      ClientManager.prototype.operationHarvest = function(id, coin) {
        this.operationListHavest[id] = id;
        ClientManager.instance.blockHistory[id] = new Big(ClientManager.instance.blockHistory[id]).minus(coin);
        this.checkSync();
      };
      ClientManager.prototype.checkSync = function() {
        var _this = this;
        this.lastSync > 0 && clearTimeout(this.lastSync);
        this.lastSync = setTimeout(function() {
          new Date().getTime() - _this.lastSyncGrow > 1e3 && _this.syncGorw();
          new Date().getTime() - _this.lastSyncHavst > 1e3 && _this.syncHavest();
        }, 2e3);
      };
      ClientManager.prototype.syncGorw = function() {
        return __awaiter(this, void 0, Promise, function() {
          var _this = this;
          return __generator(this, function(_a) {
            if (this.operationListLevelUp.length > 0) {
              this.lastSyncGrow = new Date().getTime();
              return [ 2, new Promise(function(res) {
                var operation = [];
                for (var key in _this.operationListLevelUp) operation.push(HttpManager_1.HttpManager.instance.reqHelper.growup(parseInt(key), _this.operationListLevelUp[key]));
                Promise.all(operation).then(function(value) {
                  _this.operationListLevelUp = [];
                  res();
                });
              }) ];
            }
            return [ 2 ];
          });
        });
      };
      ClientManager.prototype.syncHavest = function() {
        return __awaiter(this, void 0, Promise, function() {
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              this.lastSyncHavst = new Date().getTime();
              return [ 4, HttpManager_1.HttpManager.instance.reqHelper.tick() ];

             case 1:
              _a.sent();
              if (!(this.operationListHavest.length > 0)) return [ 3, 3 ];
              return [ 4, HttpManager_1.HttpManager.instance.reqHelper.havest(this.operationListHavest.filter(function(item) {
                return item;
              })) ];

             case 2:
              _a.sent();
              this.operationListHavest = [];
              _a.label = 3;

             case 3:
              return [ 2 ];
            }
          });
        });
      };
      return ClientManager;
    }();
    exports.ClientManager = ClientManager;
    cc._RF.pop();
  }, {
    "../net/HttpManager": "HttpManager"
  } ],
  ConfigManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9df8aYB6ExCqoyY6pR3d+g3", "ConfigManager");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var EventDispatcher_1 = require("../event/EventDispatcher");
    var GameEvent_1 = require("../event/GameEvent");
    var CardVo_1 = require("./vo/CardVo");
    var ZombieConfigVo_1 = require("./vo/ZombieConfigVo");
    var AssetsConfig_1 = require("./config/AssetsConfig");
    var AssetsManager_1 = require("./AssetsManager");
    var SkillVo_1 = require("./vo/SkillVo");
    var ConfigManager = function() {
      function ConfigManager() {
        this.clientConfig = {};
        this.zombieConfig = {};
        this.cardConfig = {};
        this.shopCondig = {};
        this.shopMap = {};
        this.bufferConfig = {};
        this.skillConfig = {};
      }
      Object.defineProperty(ConfigManager, "instance", {
        get: function() {
          null == ConfigManager._instance && (ConfigManager._instance = new ConfigManager());
          return ConfigManager._instance;
        },
        enumerable: true,
        configurable: true
      });
      ConfigManager.prototype.init = function() {
        this.loadConfig();
      };
      ConfigManager.prototype.loadConfig = function() {
        var _this = this;
        if (ConfigManager.configList.length > 0) {
          var path_1 = ConfigManager.configList.pop();
          AssetsManager_1.AssetsManager.instance.loadRes(AssetsConfig_1.AssetsConfig.CONFIG + path_1).then(function(value) {
            _this.clientConfig[path_1] = value.json;
            _this.loadConfig();
          });
        } else EventDispatcher_1.EventDispatcher.trigger(GameEvent_1.GameEvent.CONFIG_CLIENT_COMPLETE);
      };
      ConfigManager.prototype.fillGameConfig = function(config) {
        var _this = this;
        this.gameConfig = config;
        config.zombie.forEach(function(element, index) {
          var vo = new ZombieConfigVo_1.ZombieConfigVo();
          vo.decodeZombie(element);
          vo.decodeUpgrade(config.upgrade[index]);
          vo.decodeClientConfig(_this.clientConfig.config.zombie[index]);
          _this.zombieConfig[element.petId] = vo;
        });
        config.card.forEach(function(element, index) {
          var vo = new CardVo_1.CardVo();
          vo.decode(element);
          vo.decodeClientConfig(_this.clientConfig.config.card[index]);
          _this.cardConfig[vo.id] = vo;
        });
        config.shop.forEach(function(element, index) {
          _this.shopCondig[element.type] || (_this.shopCondig[element.type] = []);
          _this.clientConfig.config.shop.set[index] && (element.url = _this.clientConfig.config.shop.set[index].url);
          _this.shopCondig[element.type].push(element);
          _this.shopMap[element.id] = element;
        });
        config.skill.forEach(function(element) {
          var svo = new SkillVo_1.SkillVo();
          svo.decode(element);
          _this.skillConfig[svo.id] = svo;
        });
      };
      ConfigManager.configList = [ "window", "config" ];
      return ConfigManager;
    }();
    exports.ConfigManager = ConfigManager;
    cc._RF.pop();
  }, {
    "../event/EventDispatcher": "EventDispatcher",
    "../event/GameEvent": "GameEvent",
    "./AssetsManager": "AssetsManager",
    "./config/AssetsConfig": "AssetsConfig",
    "./vo/CardVo": "CardVo",
    "./vo/SkillVo": "SkillVo",
    "./vo/ZombieConfigVo": "ZombieConfigVo"
  } ],
  DoubleRewardWin: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "468ffF3RWhDhKq6fKKovO0Q", "DoubleRewardWin");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var HttpManager_1 = require("../net/HttpManager");
    var BufferConfig_1 = require("../data/config/BufferConfig");
    var UserManager_1 = require("../data/UserManager");
    var TimeUtils_1 = require("../utils/TimeUtils");
    var BaseStateMachine_1 = require("../frame/state/base/BaseStateMachine");
    var PlatformManager_1 = require("../platform/PlatformManager");
    var LocalizationManager_1 = require("../data/LocalizationManager");
    var StrUtils_1 = require("../utils/StrUtils");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var DoubleRewardWin = function(_super) {
      __extends(DoubleRewardWin, _super);
      function DoubleRewardWin() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.cdLabel = null;
        _this.shareBtnLabel = null;
        _this.descLabel = null;
        _this.remainLabel = null;
        _this.shareLabel = null;
        _this.purchaseLabel = null;
        _this.state1 = null;
        _this.state2 = null;
        _this.state3 = null;
        _this.isWaiteResule = false;
        return _this;
      }
      DoubleRewardWin.prototype.onLoad = function() {
        this.user = UserManager_1.UserManager.instance.user;
        this.buffer = this.user.getBuffer(BufferConfig_1.BufferConfig.DOUBLE_REVENUE);
        this.staticMachine = new BaseStateMachine_1.BaseStateMachine(this);
        this.staticMachine.changeState(InitState);
      };
      DoubleRewardWin.prototype.onEnable = function() {
        this.staticMachine.isInState(InitState) || this.staticMachine.changeState(InitState);
      };
      DoubleRewardWin.prototype.onActivity = function() {
        this.staticMachine.getCurrentState().onClick();
      };
      DoubleRewardWin.prototype.onDestroy = function() {
        this.staticMachine.cutState.onExit();
      };
      __decorate([ property(cc.Label) ], DoubleRewardWin.prototype, "cdLabel", void 0);
      __decorate([ property(cc.Label) ], DoubleRewardWin.prototype, "shareBtnLabel", void 0);
      __decorate([ property(cc.Label) ], DoubleRewardWin.prototype, "descLabel", void 0);
      __decorate([ property(cc.Label) ], DoubleRewardWin.prototype, "remainLabel", void 0);
      __decorate([ property(cc.Label) ], DoubleRewardWin.prototype, "shareLabel", void 0);
      __decorate([ property(cc.Label) ], DoubleRewardWin.prototype, "purchaseLabel", void 0);
      __decorate([ property(cc.Node) ], DoubleRewardWin.prototype, "state1", void 0);
      __decorate([ property(cc.Node) ], DoubleRewardWin.prototype, "state2", void 0);
      __decorate([ property(cc.Node) ], DoubleRewardWin.prototype, "state3", void 0);
      DoubleRewardWin = __decorate([ ccclass ], DoubleRewardWin);
      return DoubleRewardWin;
    }(cc.Component);
    exports.default = DoubleRewardWin;
    var InitState = function() {
      function InitState() {}
      InitState.prototype.onEnter = function(data) {
        this.owner = data;
        this.owner.state1.active = false;
        this.owner.state2.active = false;
        this.owner.state3.active = false;
        this.owner.descLabel.string = StrUtils_1.StrUtils.reqlace(LocalizationManager_1.LocalizationManager.localText("\u83b7\u5f97\u91d1\u5e01\u6536\u76ca*2\uff0c\u6301\u7eed#\u79d2"), this.owner.buffer.skill.para.toString());
        this.owner.buffer.time > 0 ? this.owner.staticMachine.changeState(ActivityState) : this.owner.buffer.todayUsed ? this.owner.staticMachine.changeState(PurchaseState) : this.owner.staticMachine.changeState(ShareState);
      };
      InitState.prototype.onExit = function(data) {};
      InitState.prototype.onClick = function(data) {};
      return InitState;
    }();
    var ActivityState = function() {
      function ActivityState() {}
      ActivityState.prototype.onEnter = function(data) {
        this.owner = data;
        this.owner.state1.active = true;
        this.owner.state2.active = false;
        this.owner.state3.active = false;
        this.owner.remainLabel.string = LocalizationManager_1.LocalizationManager.localText("\u5269\u4f59\u65f6\u95f4");
        cc.director.getScheduler().schedule(this.update, this, 1);
        this.update();
      };
      ActivityState.prototype.onExit = function(data) {
        cc.director.getScheduler().unschedule(this.update, this);
      };
      ActivityState.prototype.update = function(dt) {
        this.owner.buffer.time > 0 ? this.owner.cdLabel.string = TimeUtils_1.TimeUtils.time2Cooldown(this.owner.buffer.time) : this.owner.staticMachine.changeState(InitState);
      };
      ActivityState.prototype.onClick = function(data) {};
      return ActivityState;
    }();
    var ShareState = function() {
      function ShareState() {
        this.shared = false;
      }
      ShareState.prototype.onEnter = function(data) {
        this.owner = data;
        this.owner.state1.active = false;
        this.owner.state2.active = true;
        this.owner.state3.active = false;
        this.owner.shareLabel.string = LocalizationManager_1.LocalizationManager.localText("\u5206\u4eab\u540e\u514d\u8d39\u6fc0\u6d3b");
        this.owner.shareBtnLabel.string = LocalizationManager_1.LocalizationManager.localText("\u5206 \u4eab");
      };
      ShareState.prototype.onExit = function(data) {};
      ShareState.prototype.onClick = function(data) {
        PlatformManager_1.PlatformManager.instance.current.share().then(this.onShareComplete.bind(this));
      };
      ShareState.prototype.onShareComplete = function(value) {
        var _this = this;
        if (false == this.owner.isWaiteResule) {
          this.owner.isWaiteResule = true;
          HttpManager_1.HttpManager.instance.reqHelper.activeBuff(this.owner.buffer).then(function(value) {
            _this.owner.isWaiteResule = false;
            _this.owner.staticMachine.changeState(ActivityState);
          });
        }
      };
      return ShareState;
    }();
    var PurchaseState = function() {
      function PurchaseState() {}
      PurchaseState.prototype.onEnter = function(data) {
        this.owner = data;
        this.owner.state1.active = false;
        this.owner.state2.active = false;
        this.owner.state3.active = true;
        this.owner.purchaseLabel.string = LocalizationManager_1.LocalizationManager.localText("\u82b1\u8d39") + this.owner.buffer.skill.cost + LocalizationManager_1.LocalizationManager.localText("\u94bb\u77f3\u6fc0\u6d3b");
      };
      PurchaseState.prototype.onExit = function(data) {};
      PurchaseState.prototype.onClick = function(data) {
        var _this = this;
        if (this.owner.user.isEnough(this.owner.buffer.skill.cost, this.owner.buffer.skill.costType) && false == this.owner.isWaiteResule) {
          this.owner.isWaiteResule = true;
          HttpManager_1.HttpManager.instance.reqHelper.activeBuff(this.owner.buffer).then(function(value) {
            _this.owner.user.subCurrency(_this.owner.buffer.skill.cost, _this.owner.buffer.skill.costType);
            _this.owner.isWaiteResule = false;
            _this.owner.staticMachine.changeState(ActivityState);
          });
        }
      };
      return PurchaseState;
    }();
    cc._RF.pop();
  }, {
    "../data/LocalizationManager": "LocalizationManager",
    "../data/UserManager": "UserManager",
    "../data/config/BufferConfig": "BufferConfig",
    "../frame/state/base/BaseStateMachine": "BaseStateMachine",
    "../net/HttpManager": "HttpManager",
    "../platform/PlatformManager": "PlatformManager",
    "../utils/StrUtils": "StrUtils",
    "../utils/TimeUtils": "TimeUtils"
  } ],
  DoubleSpeedWin: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "18bdf9e9cNIxbJR15liUVwa", "DoubleSpeedWin");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var HttpManager_1 = require("../net/HttpManager");
    var BufferConfig_1 = require("../data/config/BufferConfig");
    var UserManager_1 = require("../data/UserManager");
    var TimeUtils_1 = require("../utils/TimeUtils");
    var BaseStateMachine_1 = require("../frame/state/base/BaseStateMachine");
    var PlatformManager_1 = require("../platform/PlatformManager");
    var LocalizationManager_1 = require("../data/LocalizationManager");
    var StrUtils_1 = require("../utils/StrUtils");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var DoubleSpeedWin = function(_super) {
      __extends(DoubleSpeedWin, _super);
      function DoubleSpeedWin() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.cdLabel = null;
        _this.shareBtnLabel = null;
        _this.descLabel = null;
        _this.remainLabel = null;
        _this.shareLabel = null;
        _this.purchaseLabel = null;
        _this.state1 = null;
        _this.state2 = null;
        _this.state3 = null;
        _this.isWaiteResule = false;
        return _this;
      }
      DoubleSpeedWin.prototype.onLoad = function() {
        this.user = UserManager_1.UserManager.instance.user;
        this.buffer = this.user.getBuffer(BufferConfig_1.BufferConfig.DOUBLE_EFFICIENCY);
        this.staticMachine = new BaseStateMachine_1.BaseStateMachine(this);
        this.staticMachine.changeState(InitState);
      };
      DoubleSpeedWin.prototype.onEnable = function() {
        this.staticMachine.isInState(InitState) || this.staticMachine.changeState(InitState);
      };
      DoubleSpeedWin.prototype.onActivity = function() {
        this.staticMachine.getCurrentState().onClick();
      };
      DoubleSpeedWin.prototype.onDestroy = function() {
        this.staticMachine.cutState.onExit();
      };
      __decorate([ property(cc.Label) ], DoubleSpeedWin.prototype, "cdLabel", void 0);
      __decorate([ property(cc.Label) ], DoubleSpeedWin.prototype, "shareBtnLabel", void 0);
      __decorate([ property(cc.Label) ], DoubleSpeedWin.prototype, "descLabel", void 0);
      __decorate([ property(cc.Label) ], DoubleSpeedWin.prototype, "remainLabel", void 0);
      __decorate([ property(cc.Label) ], DoubleSpeedWin.prototype, "shareLabel", void 0);
      __decorate([ property(cc.Label) ], DoubleSpeedWin.prototype, "purchaseLabel", void 0);
      __decorate([ property(cc.Node) ], DoubleSpeedWin.prototype, "state1", void 0);
      __decorate([ property(cc.Node) ], DoubleSpeedWin.prototype, "state2", void 0);
      __decorate([ property(cc.Node) ], DoubleSpeedWin.prototype, "state3", void 0);
      DoubleSpeedWin = __decorate([ ccclass ], DoubleSpeedWin);
      return DoubleSpeedWin;
    }(cc.Component);
    exports.default = DoubleSpeedWin;
    var InitState = function() {
      function InitState() {}
      InitState.prototype.onEnter = function(data) {
        this.owner = data;
        this.owner.state1.active = false;
        this.owner.state2.active = false;
        this.owner.state3.active = false;
        this.owner.descLabel.string = StrUtils_1.StrUtils.reqlace(LocalizationManager_1.LocalizationManager.localText("\u4ea7\u51fa\u65f6\u95f4\u7f29\u77ed50%\uff0c\u6301\u7eed#\u79d2"), this.owner.buffer.skill.para.toString());
        this.owner.buffer.time > 0 ? this.owner.staticMachine.changeState(ActivityState) : this.owner.buffer.todayUsed ? this.owner.staticMachine.changeState(PurchaseState) : this.owner.staticMachine.changeState(ShareState);
      };
      InitState.prototype.onExit = function(data) {};
      InitState.prototype.onClick = function(data) {};
      return InitState;
    }();
    var ActivityState = function() {
      function ActivityState() {}
      ActivityState.prototype.onEnter = function(data) {
        this.owner = data;
        this.owner.state1.active = true;
        this.owner.state2.active = false;
        this.owner.state3.active = false;
        this.owner.remainLabel.string = LocalizationManager_1.LocalizationManager.localText("\u5269\u4f59\u65f6\u95f4");
        cc.director.getScheduler().schedule(this.update, this, 1);
        this.update();
      };
      ActivityState.prototype.onExit = function(data) {
        cc.director.getScheduler().unschedule(this.update, this);
      };
      ActivityState.prototype.update = function(dt) {
        this.owner.buffer.time > 0 ? this.owner.cdLabel.string = TimeUtils_1.TimeUtils.time2Cooldown(this.owner.buffer.time) : this.owner.staticMachine.changeState(InitState);
      };
      ActivityState.prototype.onClick = function(data) {};
      return ActivityState;
    }();
    var ShareState = function() {
      function ShareState() {
        this.shared = false;
      }
      ShareState.prototype.onEnter = function(data) {
        this.owner = data;
        this.owner.state1.active = false;
        this.owner.state2.active = true;
        this.owner.state3.active = false;
        this.owner.shareLabel.string = LocalizationManager_1.LocalizationManager.localText("\u5206\u4eab\u540e\u514d\u8d39\u6fc0\u6d3b");
        this.owner.shareBtnLabel.string = LocalizationManager_1.LocalizationManager.localText("\u5206 \u4eab");
      };
      ShareState.prototype.onExit = function(data) {};
      ShareState.prototype.onClick = function(data) {
        PlatformManager_1.PlatformManager.instance.current.share().then(this.onShareComplete.bind(this));
      };
      ShareState.prototype.onShareComplete = function(value) {
        var _this = this;
        if (false == this.owner.isWaiteResule) {
          this.owner.isWaiteResule = true;
          HttpManager_1.HttpManager.instance.reqHelper.activeBuff(this.owner.buffer).then(function(value) {
            _this.owner.isWaiteResule = false;
            _this.owner.staticMachine.changeState(ActivityState);
          });
        }
      };
      return ShareState;
    }();
    var PurchaseState = function() {
      function PurchaseState() {}
      PurchaseState.prototype.onEnter = function(data) {
        this.owner = data;
        this.owner.state1.active = false;
        this.owner.state2.active = false;
        this.owner.state3.active = true;
        this.owner.purchaseLabel.string = LocalizationManager_1.LocalizationManager.localText("\u82b1\u8d39") + this.owner.buffer.skill.cost + LocalizationManager_1.LocalizationManager.localText("\u94bb\u77f3\u6fc0\u6d3b");
      };
      PurchaseState.prototype.onExit = function(data) {};
      PurchaseState.prototype.onClick = function(data) {
        var _this = this;
        if (this.owner.user.isEnough(this.owner.buffer.skill.cost, this.owner.buffer.skill.costType) && false == this.owner.isWaiteResule) {
          this.owner.isWaiteResule = true;
          HttpManager_1.HttpManager.instance.reqHelper.activeBuff(this.owner.buffer).then(function(value) {
            _this.owner.user.subCurrency(_this.owner.buffer.skill.cost, _this.owner.buffer.skill.costType);
            _this.owner.isWaiteResule = false;
            _this.owner.staticMachine.changeState(ActivityState);
          });
        }
      };
      return PurchaseState;
    }();
    cc._RF.pop();
  }, {
    "../data/LocalizationManager": "LocalizationManager",
    "../data/UserManager": "UserManager",
    "../data/config/BufferConfig": "BufferConfig",
    "../frame/state/base/BaseStateMachine": "BaseStateMachine",
    "../net/HttpManager": "HttpManager",
    "../platform/PlatformManager": "PlatformManager",
    "../utils/StrUtils": "StrUtils",
    "../utils/TimeUtils": "TimeUtils"
  } ],
  EventDispatcher: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "5cd690EniVHip5us71kG0+W", "EventDispatcher");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var EventDispatcher = function() {
      function EventDispatcher() {}
      Object.defineProperty(EventDispatcher, "instance", {
        get: function() {
          null == EventDispatcher._instance && (EventDispatcher._instance = new EventDispatcher());
          return EventDispatcher._instance;
        },
        enumerable: true,
        configurable: true
      });
      EventDispatcher.trigger = function(event, args) {
        return EventDispatcher.instance.trigger(event, args);
      };
      EventDispatcher.on = function(event, listener, target) {
        return EventDispatcher.instance.on(event, listener, target);
      };
      EventDispatcher.once = function(event, listener, target) {
        return EventDispatcher.instance.once(event, listener, target);
      };
      EventDispatcher.off = function(event, listener, target) {
        return EventDispatcher.instance.off(event, listener, target);
      };
      EventDispatcher.prototype.getListeners = function(event) {
        var events = this._getEvents();
        var response;
        var key;
        if (event instanceof RegExp) {
          response = {};
          for (key in events) events.hasOwnProperty(key) && event.test(key) && (response[key] = events[key]);
        } else response = events[event] || (events[event] = []);
        return response;
      };
      EventDispatcher.prototype.addListener = function(event, listener, target) {
        if (!this.isValidListener(listener)) throw new TypeError("listener must be a function");
        var listeners = this.getListenersAsObject(event);
        var listenerIsWrapped = "object" === typeof listener;
        var key;
        for (key in listeners) listeners.hasOwnProperty(key) && -1 === this.indexOfListener(listeners[key], listener, target) && listeners[key].push(listenerIsWrapped ? listener : {
          listener: listener,
          target: target,
          once: false
        });
        return this;
      };
      EventDispatcher.prototype.on = function(event, listener, target) {
        return this.addListener(event, listener, target);
      };
      EventDispatcher.prototype.flattenListeners = function(listeners) {
        var flatListeners = [];
        var i;
        for (i = 0; i < listeners.length; i += 1) flatListeners.push(listeners[i].listener);
        return flatListeners;
      };
      EventDispatcher.prototype.getListenersAsObject = function(event) {
        var listeners = this.getListeners(event);
        var response;
        if (listeners instanceof Array) {
          response = {};
          response[event] = listeners;
        }
        return response || listeners;
      };
      EventDispatcher.prototype.addOnceListener = function(event, listener, target) {
        return this.addListener(event, {
          listener: listener,
          once: true
        }, target);
      };
      EventDispatcher.prototype.once = function(event, listener, target) {
        return this.addOnceListener(event, listener, target);
      };
      EventDispatcher.prototype.defineEvent = function(event) {
        this.getListeners(event);
        return this;
      };
      EventDispatcher.prototype.defineEvents = function(events) {
        for (var i = 0; i < events.length; i += 1) this.defineEvent(events[i]);
        return this;
      };
      EventDispatcher.prototype.removeListener = function(event, listener, target) {
        var listeners = this.getListenersAsObject(event);
        var index;
        var key;
        for (key in listeners) if (listeners.hasOwnProperty(key)) {
          index = this.indexOfListener(listeners[key], listener, target);
          -1 !== index && listeners[key].splice(index, 1);
        }
        return this;
      };
      EventDispatcher.prototype.off = function(event, listener, target) {
        return this.removeListener(event, listener, target);
      };
      EventDispatcher.prototype.addListeners = function(event, listeners) {
        return this.manipulateListeners(false, event, listeners);
      };
      EventDispatcher.prototype.removeListeners = function(event, listeners) {
        return this.manipulateListeners(true, event, listeners);
      };
      EventDispatcher.prototype.manipulateListeners = function(remove, event, listeners) {
        var i;
        var value;
        var single = remove ? this.removeListener : this.addListener;
        var multiple = remove ? this.removeListeners : this.addListeners;
        if ("object" !== typeof event || event instanceof RegExp) {
          i = listeners.length;
          while (i--) single.call(this, event, listeners[i]);
        } else for (i in event) event.hasOwnProperty(i) && (value = event[i]) && ("function" === typeof value ? single.call(this, i, value) : multiple.call(this, i, value));
        return this;
      };
      EventDispatcher.prototype.removeEvent = function(event) {
        var type = typeof event;
        var events = this._getEvents();
        var key;
        if ("string" === type) delete events[event]; else if (event instanceof RegExp) for (key in events) events.hasOwnProperty(key) && event.test(key) && delete events[key]; else delete this._events;
        return this;
      };
      EventDispatcher.prototype.removeAllListeners = function(event) {
        return this.removeEvent(event);
      };
      EventDispatcher.prototype.emitEvent = function(event, args) {
        var listenersMap = this.getListenersAsObject(event);
        var listeners;
        var listener;
        var i;
        var key;
        var response;
        for (key in listenersMap) if (listenersMap.hasOwnProperty(key)) {
          listeners = listenersMap[key].slice(0);
          for (i = 0; i < listeners.length; i++) {
            listener = listeners[i];
            true === listener.once && this.removeListener(event, listener.listener, listener.target);
            response = listener.listener.call(listener.target ? listener.target : this, {
              type: event,
              eventData: args
            });
            response === this.onceReturnValue && this.removeListener(event, listener.listener, listener.target);
          }
        }
        return this;
      };
      EventDispatcher.prototype.trigger = function(event, args) {
        return this.emitEvent(event, args);
      };
      EventDispatcher.prototype.emit = function(event, args) {
        args = args[0] || {};
        return this.emitEvent(event, args);
      };
      Object.defineProperty(EventDispatcher.prototype, "onceReturnValue", {
        get: function() {
          return !this.hasOwnProperty("_onceReturnValue") || this._onceReturnValue;
        },
        set: function(value) {
          this._onceReturnValue = value;
        },
        enumerable: true,
        configurable: true
      });
      EventDispatcher.prototype._getEvents = function() {
        return this._events || (this._events = {});
      };
      EventDispatcher.prototype.isValidListener = function(listener) {
        return "function" === typeof listener || listener instanceof RegExp || !(!listener || "object" !== typeof listener) && this.isValidListener(listener);
      };
      EventDispatcher.prototype.indexOfListener = function(listeners, listener, target) {
        var i = listeners.length;
        while (i--) if (listeners[i].listener === listener && listeners[i].target === target) return i;
        return -1;
      };
      return EventDispatcher;
    }();
    exports.EventDispatcher = EventDispatcher;
    cc._RF.pop();
  }, {} ],
  FbPlatform: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6e3410+igRNX6RvjDaprB7Y", "FbPlatform");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var GameEvent_1 = require("../../event/GameEvent");
    var EventDispatcher_1 = require("../../event/EventDispatcher");
    var ClientManager_1 = require("../../data/ClientManager");
    var UserManager_1 = require("../../data/UserManager");
    var FbPlatform = function() {
      function FbPlatform() {}
      FbPlatform.prototype.init = function(data) {
        FBInstant.initializeAsync().then(function() {
          this.locale = FBInstant.getLocale();
          this.platform = FBInstant.getPlatform();
          this.sdkVersion = FBInstant.getSDKVersion();
          ClientManager_1.ClientManager.instance.openid = FBInstant.player.getID();
          this.getUserInfo();
        });
      };
      FbPlatform.prototype.getUserInfo = function() {
        UserManager_1.UserManager.instance.user.name = FBInstant.player.getName();
        UserManager_1.UserManager.instance.user.photo = FBInstant.player.getPhoto();
        var locale = FBInstant.getLocale();
        EventDispatcher_1.EventDispatcher.trigger(GameEvent_1.GameEvent.PLATFORM_CUCCSEE);
      };
      FbPlatform.prototype.playAd = function(callback) {
        var ad = null;
        FBInstant.getRewardedVideoAsync("my_placement_id").then(function(rewardedVideo) {
          ad = rewardedVideo;
          return ad.loadAsync();
        }).then(function() {
          return ad.showAsync();
        }).then(function() {
          callback();
        });
      };
      FbPlatform.prototype.onPause = function(callback) {
        FBInstant.onPause(function() {
          callback();
          console.log("Pause event was triggered!");
        });
      };
      FbPlatform.prototype.updateRank = function(data) {
        FBInstant.getLeaderboardAsync("my_leaderboard").then(function(leaderboard) {
          return leaderboard.setScoreAsync(42, '{race: "elf", level: 3}');
        }).then(function(entry) {
          console.log(entry.getScore());
          console.log(entry.getExtraData());
        });
      };
      FbPlatform.prototype.getLeaderboard = function(callback) {
        FBInstant.getLeaderboardAsync("my_leaderboard").then(function(leaderboard) {
          return leaderboard.getEntriesAsync(10, 0);
        }).then(function(entries) {
          console.log(entries.length);
          console.log(entries[0].getRank());
          console.log(entries[0].getScore());
          console.log(entries[1].getRank());
          console.log(entries[1].getScore());
        });
      };
      FbPlatform.prototype.share = function(text, img) {
        return __awaiter(this, void 0, Promise, function() {
          return __generator(this, function(_a) {
            return [ 2, new Promise(function(res, rej) {
              FBInstant.shareAsync({
                intent: "REQUEST",
                image: img,
                text: text,
                data: {
                  myReplayData: "..."
                }
              }).then(function() {
                res();
              });
            }) ];
          });
        });
      };
      return FbPlatform;
    }();
    exports.FbPlatform = FbPlatform;
    cc._RF.pop();
  }, {
    "../../data/ClientManager": "ClientManager",
    "../../data/UserManager": "UserManager",
    "../../event/EventDispatcher": "EventDispatcher",
    "../../event/GameEvent": "GameEvent"
  } ],
  GameEvent: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e4e890JHjJAi6Di/30Do1NU", "GameEvent");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var GameEvent = function() {
      function GameEvent() {}
      GameEvent.WONDOW_OPEN = "windowOpen";
      GameEvent.WONDOW_CLOSE = "windowClose";
      GameEvent.STATE_ZOMBIE_CHECK = "stateZombieCheck";
      GameEvent.USER_INFO_UPDATE = "userInfoUpdate";
      GameEvent.USER_INFO_COMPLETE = "userInfoComplete";
      GameEvent.USER_COIN_UPDATE = "userCoinUpdate";
      GameEvent.USER_REBRITH = "suerRrith";
      GameEvent.BLOCK_INFO_UPDATE = "blockInfoUpdate";
      GameEvent.WIN_WELFARE = "winWelfare";
      GameEvent.WIN_INIT_COMPLETE = "winInitComplete";
      GameEvent.CONFIG_COMPLETE = "configComplete";
      GameEvent.CONFIG_CLIENT_COMPLETE = "configClientComplete";
      GameEvent.BUFFER_UPDATE = "bufferUpdate";
      GameEvent.BUY_SUCCESS = "buySuccess";
      GameEvent.PLATFORM_CUCCSEE = "platformCuccsee";
      return GameEvent;
    }();
    exports.GameEvent = GameEvent;
    cc._RF.pop();
  }, {} ],
  GameScene: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0cf824c66JF3LVzHEe7+uFD", "GameScene");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var EventDispatcher_1 = require("../../Script/event/EventDispatcher");
    var GameEvent_1 = require("../../Script/event/GameEvent");
    var WindowConfig_1 = require("../../Script/data/config/WindowConfig");
    var ClientManager_1 = require("../../Script/data/ClientManager");
    var UserManager_1 = require("../../Script/data/UserManager");
    var WindowManager_1 = require("../../Script/window/manager/WindowManager");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var GameScene = function(_super) {
      __extends(GameScene, _super);
      function GameScene() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.goldPrefab = null;
        _this.leftNode = null;
        _this.bufferPrefab = null;
        _this.ms = null;
        return _this;
      }
      GameScene.prototype.onLoad = function() {
        this.bufferIconList = {};
        EventDispatcher_1.EventDispatcher.on(GameEvent_1.GameEvent.USER_INFO_COMPLETE, this.onUserComplete, this);
        EventDispatcher_1.EventDispatcher.on(GameEvent_1.GameEvent.BUFFER_UPDATE, this.checkBuffer, this);
        this.node.on(cc.Node.EventType.TOUCH_START, this.onBegin, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onEnd, this);
        cc.director.getCollisionManager().enabled = true;
      };
      GameScene.prototype.onDestroy = function() {
        this.node.off(cc.Node.EventType.TOUCH_START, this.onBegin, this);
        this.node.off(cc.Node.EventType.TOUCH_END, this.onEnd, this);
      };
      GameScene.prototype.onClickRank = function() {
        WindowManager_1.default.instance.open(WindowConfig_1.WindowConfig.RANK);
      };
      GameScene.prototype.onDoubleEfficiency = function() {
        WindowManager_1.default.instance.open(WindowConfig_1.WindowConfig.DOUBLEEFFICIENCY);
      };
      GameScene.prototype.onDoubleRevenue = function() {
        WindowManager_1.default.instance.open(WindowConfig_1.WindowConfig.DOUBLEREVENUE);
      };
      GameScene.prototype.onMove = function(evt) {
        var gp = evt.target.convertToNodeSpaceAR(evt.touch._point);
        this.ms.node.x = gp.x;
        this.ms.node.y = gp.y;
      };
      GameScene.prototype.onBegin = function(evt) {
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onMove, this);
        this.ms.node.opacity = 255;
      };
      GameScene.prototype.onEnd = function(evt) {
        this.node.off(cc.Node.EventType.TOUCH_MOVE, this.onMove, this);
        this.ms.node.opacity = 0;
      };
      GameScene.prototype.onUserComplete = function() {
        ClientManager_1.ClientManager.instance.totalOfflineReward > 0 ? WindowManager_1.default.instance.open(WindowConfig_1.WindowConfig.WELCOME) : UserManager_1.UserManager.instance.checkDaliyCard();
        this.checkBuffer();
      };
      GameScene.prototype.checkBuffer = function() {
        for (var key in UserManager_1.UserManager.instance.user.bufferMap) {
          var bvo = UserManager_1.UserManager.instance.user.bufferMap[key];
          var bn = void 0;
          if (this.bufferIconList[key]) bn = this.bufferIconList[key]; else {
            bn = cc.instantiate(this.bufferPrefab);
            this.leftNode.addChild(bn);
            this.bufferIconList[key] = bn;
          }
          bn.getComponent("BufferRenderer").fillData(bvo);
        }
      };
      __decorate([ property(cc.Prefab) ], GameScene.prototype, "goldPrefab", void 0);
      __decorate([ property(cc.Node) ], GameScene.prototype, "leftNode", void 0);
      __decorate([ property(cc.Prefab) ], GameScene.prototype, "bufferPrefab", void 0);
      __decorate([ property(cc.MotionStreak) ], GameScene.prototype, "ms", void 0);
      GameScene = __decorate([ ccclass ], GameScene);
      return GameScene;
    }(cc.Component);
    exports.default = GameScene;
    cc._RF.pop();
  }, {
    "../../Script/data/ClientManager": "ClientManager",
    "../../Script/data/UserManager": "UserManager",
    "../../Script/data/config/WindowConfig": "WindowConfig",
    "../../Script/event/EventDispatcher": "EventDispatcher",
    "../../Script/event/GameEvent": "GameEvent",
    "../../Script/window/manager/WindowManager": "WindowManager"
  } ],
  GoldManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "bcb0aEXG/xCApwPhEAwBxB/", "GoldManager");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var GoldManager = function() {
      function GoldManager() {
        this.goldPoll = [];
        this.scene = cc.director.getScene().getChildByName("Canvas");
      }
      Object.defineProperty(GoldManager, "instance", {
        get: function() {
          null == GoldManager._instance && (GoldManager._instance = new GoldManager());
          return GoldManager._instance;
        },
        enumerable: true,
        configurable: true
      });
      GoldManager.prototype.fly = function(a, b) {
        var gold = this.getGold();
        gold.x = a.x;
        gold.y = a.y;
        this.scene.addChild(gold);
        var move = cc.sequence(cc.moveTo(.3, b.x, b.y), cc.callFunc(this.moveComplete, this, gold));
        gold.runAction(move);
      };
      GoldManager.prototype.fly2Info = function(a) {
        var top = cc.director.getScene().getChildByName("Canvas").getChildByName("menu").getChildByName("top");
        this.fly(a, top.position);
      };
      GoldManager.prototype.getGold = function() {
        var script;
        var sp;
        for (var i = 0; i < this.goldPoll.length; i++) {
          script = this.goldPoll[i].getComponent("GoldRenderer");
          if (script && script.complete) {
            sp = this.goldPoll[i];
            break;
          }
        }
        if (!sp) {
          var gold = this.scene.getComponent("GameScene").goldPrefab;
          sp = cc.instantiate(gold);
          script = sp.getComponent("GoldRenderer");
          this.goldPoll.push(sp);
        }
        script.complete = false;
        return sp;
      };
      GoldManager.prototype.moveComplete = function(gold) {
        gold.parent.removeChild(gold);
        var script = gold.getComponent("GoldRenderer");
        script.complete = true;
      };
      GoldManager.DEF_POOL_NUM = 9;
      return GoldManager;
    }();
    exports.GoldManager = GoldManager;
    cc._RF.pop();
  }, {} ],
  GoldRenderer: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "8bd6cp5ZQJBD73O048mJtZb", "GoldRenderer");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var GoldRenderer = function(_super) {
      __extends(GoldRenderer, _super);
      function GoldRenderer() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.gold = null;
        _this.complete = false;
        return _this;
      }
      GoldRenderer.prototype.start = function() {};
      __decorate([ property(cc.Sprite) ], GoldRenderer.prototype, "gold", void 0);
      GoldRenderer = __decorate([ ccclass ], GoldRenderer);
      return GoldRenderer;
    }(cc.Component);
    exports.default = GoldRenderer;
    cc._RF.pop();
  }, {} ],
  HttpHandle: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "676b5jbklpJO7sQZaYPLszt", "HttpHandle");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var HttpManager_1 = require("./HttpManager");
    var UrlConfig_1 = require("../data/config/UrlConfig");
    var HttpHandle = function() {
      function HttpHandle(clazz) {
        this.clazz = clazz;
      }
      HttpHandle.prototype.getConfig = function() {
        return __awaiter(this, void 0, Promise, function() {
          return __generator(this, function(_a) {
            return [ 2, new Promise(function(res, rej) {
              HttpManager_1.HttpManager.instance.gamePost(UrlConfig_1.UrlConfig.CONFIG).onComplete(res).onError(rej).send();
            }) ];
          });
        });
      };
      HttpHandle.prototype.unlock = function(id, onResult) {
        return __awaiter(this, void 0, Promise, function() {
          return __generator(this, function(_a) {
            return [ 2, new Promise(function(res, rej) {}) ];
          });
        });
      };
      return HttpHandle;
    }();
    exports.HttpHandle = HttpHandle;
    cc._RF.pop();
  }, {
    "../data/config/UrlConfig": "UrlConfig",
    "./HttpManager": "HttpManager"
  } ],
  HttpManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7e298h+W11FvZEJhxQ6SVMf", "HttpManager");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var UserManager_1 = require("../data/UserManager");
    var EventDispatcher_1 = require("../event/EventDispatcher");
    var GameEvent_1 = require("../event/GameEvent");
    var ConfigManager_1 = require("../data/ConfigManager");
    var WindowManager_1 = require("../window/manager/WindowManager");
    var UrlConfig_1 = require("../data/config/UrlConfig");
    var WindowConfig_1 = require("../data/config/WindowConfig");
    var HttpProxy_1 = require("./HttpProxy");
    var ClientManager_1 = require("../data/ClientManager");
    var BufferConfig_1 = require("../data/config/BufferConfig");
    var Base64_1 = require("../utils/Base64");
    var LocalizationManager_1 = require("../data/LocalizationManager");
    var HttpManager = function() {
      function HttpManager() {
        this.reqHelper = new ReqHelper();
      }
      Object.defineProperty(HttpManager, "instance", {
        get: function() {
          null == HttpManager._instance && (HttpManager._instance = new HttpManager());
          return HttpManager._instance;
        },
        enumerable: true,
        configurable: true
      });
      HttpManager.prototype.post = function(url, callback, data) {
        var xhr = new HttpProxy_1.HttpProxy();
        xhr.open(url, HttpProxy_1.HttpProxy.POST);
        xhr.setRequestHeader({
          "Content-Type": "application/json",
          Authorization: "Basic " + Base64_1.Base64.encode(ClientManager_1.ClientManager.instance.userName + ":" + ClientManager_1.ClientManager.instance.token)
        });
        xhr.onComplete(callback);
        xhr.onError(this.onError, this);
        xhr.send(data);
        return xhr;
      };
      HttpManager.prototype.gamePost = function(url) {
        var xhr = new HttpProxy_1.HttpProxy();
        xhr.open(url, HttpProxy_1.HttpProxy.POST);
        xhr.setRequestHeader({
          "Content-Type": "application/json",
          Authorization: "Basic " + Base64_1.Base64.encode(ClientManager_1.ClientManager.instance.userName + ":" + ClientManager_1.ClientManager.instance.token)
        });
        return xhr;
      };
      HttpManager.prototype.onError = function(error) {
        console.error(error);
      };
      return HttpManager;
    }();
    exports.HttpManager = HttpManager;
    var ReqHelper = function() {
      function ReqHelper() {}
      ReqHelper.prototype.login = function() {
        return __awaiter(this, void 0, Promise, function() {
          var _this = this;
          return __generator(this, function(_a) {
            return [ 2, new Promise(function(resolve, reject) {
              var xhr = new HttpProxy_1.HttpProxy();
              xhr.openPost(UrlConfig_1.UrlConfig.LOGIN, function(response) {
                var data = JSON.parse(response);
                if ("success" == data.result) {
                  ClientManager_1.ClientManager.instance.userName = data.data.username;
                  for (var i = 1; i < 10; i++) {
                    ClientManager_1.ClientManager.instance.offlineReward[i] = data.data.offearnings[i];
                    ClientManager_1.ClientManager.instance.totalOfflineReward += data.data.offearnings[i];
                  }
                  HttpManager.instance.requstHeader = {
                    "Content-Type": "application/json",
                    Authorization: "Basic " + Base64_1.Base64.encode(ClientManager_1.ClientManager.instance.userName + ":" + ClientManager_1.ClientManager.instance.token)
                  };
                  setInterval(function() {
                    _this.tick();
                  }, 1e4);
                  resolve();
                } else WindowManager_1.default.instance.alert("\n\u6d4b\u8bd5\u73af\u5883\u70b9\u51fb\u786e\u5b9a\u7ee7\u7eed\u6e38\u620f", "\u767b\u5f55\u5931\u8d25\uff01", resolve);
              }, JSON.stringify({
                token: ClientManager_1.ClientManager.instance.token,
                openid: ClientManager_1.ClientManager.instance.openid
              }));
            }) ];
          });
        });
      };
      ReqHelper.prototype.getConfig = function() {
        return __awaiter(this, void 0, Promise, function() {
          var _this = this;
          return __generator(this, function(_a) {
            return [ 2, new Promise(function(resolve) {
              HttpManager.instance.post(UrlConfig_1.UrlConfig.CONFIG, function(response) {
                var data = JSON.parse(response);
                if ("success" == data.result) {
                  ConfigManager_1.ConfigManager.instance.fillGameConfig(data.data);
                  EventDispatcher_1.EventDispatcher.trigger(GameEvent_1.GameEvent.CONFIG_COMPLETE);
                } else WindowManager_1.default.instance.alert("\u83b7\u53d6\u914d\u7f6e\u5931\u8d25", "", _this.getConfig.bind(_this));
                resolve();
              }, JSON.stringify({
                code: "061X44TR15R6T71mRTWR1MD7TR1X44Tq"
              }));
            }) ];
          });
        });
      };
      ReqHelper.prototype.getUserInfo = function(id) {
        HttpManager.instance.post(UrlConfig_1.UrlConfig.USERINFO, function(response) {
          var data = JSON.parse(response);
          if ("success" == data.result) {
            ClientManager_1.ClientManager.instance.userData = response;
            ClientManager_1.ClientManager.instance.standardTime = data.data.ticktime;
            UserManager_1.UserManager.instance.creatorUser(data.data);
            EventDispatcher_1.EventDispatcher.trigger(GameEvent_1.GameEvent.USER_INFO_UPDATE);
            EventDispatcher_1.EventDispatcher.trigger(GameEvent_1.GameEvent.USER_INFO_COMPLETE);
            EventDispatcher_1.EventDispatcher.trigger(GameEvent_1.GameEvent.BLOCK_INFO_UPDATE);
          } else WindowManager_1.default.instance.alert(LocalizationManager_1.LocalizationManager.localText("\u83b7\u53d6\u7528\u6237\u4fe1\u606f\u5931\u8d25"));
        }, JSON.stringify({
          code: "061X44TR15R6T71mRTWR1MD7TR1X44Tq"
        }));
      };
      ReqHelper.prototype.unlock = function(id, onResult) {
        var unlockId = id;
        HttpManager.instance.post(UrlConfig_1.UrlConfig.UNLOCK, function(response) {
          var data = JSON.parse(response);
          if ("success" == data.result) {
            UserManager_1.UserManager.instance.user.zmobieMap[unlockId].level = 1;
            EventDispatcher_1.EventDispatcher.trigger(GameEvent_1.GameEvent.USER_INFO_UPDATE);
            onResult();
          } else WindowManager_1.default.instance.alert(LocalizationManager_1.LocalizationManager.localText("\u89e3\u9501\u5931\u8d25\uff01"));
        }, JSON.stringify({
          petId: id
        }));
      };
      ReqHelper.prototype.walfare = function() {
        return __awaiter(this, void 0, Promise, function() {
          return __generator(this, function(_a) {
            return [ 2, new Promise(function(res, rej) {
              HttpManager.instance.post(UrlConfig_1.UrlConfig.GET_CARD, function(response) {
                var data = JSON.parse(response);
                if ("success" == data.result) res(data.data); else {
                  rej();
                  WindowManager_1.default.instance.alert(LocalizationManager_1.LocalizationManager.localText("\u7206\u70b8\u50f5\u5c38\u9886\u53d6\u5931\u8d25\uff01"));
                }
              }, JSON.stringify({
                event: BufferConfig_1.ProtoConfig.GETCARD_BOMBZOMBIE
              }));
            }) ];
          });
        });
      };
      ReqHelper.prototype.dalyiCard = function() {
        HttpManager.instance.post(UrlConfig_1.UrlConfig.GET_CARD, function(response) {
          var data = JSON.parse(response);
          if ("success" == data.result) {
            data.data.cards.forEach(function(element) {
              UserManager_1.UserManager.instance.user.cardMap[element] += 1;
            });
            WindowManager_1.default.instance.open(WindowConfig_1.WindowConfig.WALFARE, {
              params: data.data.cards
            });
          } else WindowManager_1.default.instance.alert(LocalizationManager_1.LocalizationManager.localText("\u6bcf\u65e5\u5361\u5305\u9886\u53d6\u5931\u8d25\uff01"));
        }, JSON.stringify({
          event: BufferConfig_1.ProtoConfig.GETCARD_DALIYCARD
        }));
      };
      ReqHelper.prototype.growup = function(id, level) {
        return __awaiter(this, void 0, Promise, function() {
          return __generator(this, function(_a) {
            return [ 2, new Promise(function(res, rej) {
              HttpManager.instance.post(UrlConfig_1.UrlConfig.USER_GROWUP, function(response) {
                var data = JSON.parse(response);
                if ("success" == data.result) {
                  EventDispatcher_1.EventDispatcher.trigger(GameEvent_1.GameEvent.USER_INFO_UPDATE);
                  res();
                } else {
                  rej();
                  WindowManager_1.default.instance.alert(LocalizationManager_1.LocalizationManager.localText("\u50f5\u5c38\u5347\u7ea7\u9519\u8bef\uff01"));
                }
              }, JSON.stringify({
                petId: id,
                delta: level
              }));
            }) ];
          });
        });
      };
      ReqHelper.prototype.havest = function(list) {
        return __awaiter(this, void 0, Promise, function() {
          return __generator(this, function(_a) {
            return [ 2, new Promise(function(res, rej) {
              HttpManager.instance.post(UrlConfig_1.UrlConfig.USER_HAVEST, function(response) {
                var data = JSON.parse(response);
                if ("success" == data.result) {
                  EventDispatcher_1.EventDispatcher.trigger(GameEvent_1.GameEvent.USER_INFO_UPDATE);
                  res();
                } else {
                  res();
                  WindowManager_1.default.instance.alert(LocalizationManager_1.LocalizationManager.localText("\u6536\u5206\u9519\u8bef\uff01"));
                }
              }, JSON.stringify({
                petId: list
              }));
            }) ];
          });
        });
      };
      ReqHelper.prototype.levelUp = function() {
        return __awaiter(this, void 0, Promise, function() {
          return __generator(this, function(_a) {
            return [ 2, new Promise(function(res, rej) {
              HttpManager.instance.post(UrlConfig_1.UrlConfig.USER_LEVELUP, function(response) {
                var data = JSON.parse(response);
                if ("success" == data.result) {
                  ClientManager_1.ClientManager.instance.userData = response;
                  UserManager_1.UserManager.instance.fillUser(UserManager_1.UserManager.instance.user, data.data);
                  EventDispatcher_1.EventDispatcher.trigger(GameEvent_1.GameEvent.USER_REBRITH);
                  EventDispatcher_1.EventDispatcher.trigger(GameEvent_1.GameEvent.BLOCK_INFO_UPDATE);
                  res();
                } else {
                  console.error(data.message);
                  WindowManager_1.default.instance.alert(LocalizationManager_1.LocalizationManager.localText("\u519b\u56e2\u5347\u7ea7\u5931\u8d25\uff01"));
                  rej();
                }
              }, JSON.stringify({
                delta: 1
              }));
            }) ];
          });
        });
      };
      ReqHelper.prototype.activeBuff = function(buffer) {
        return __awaiter(this, void 0, Promise, function() {
          return __generator(this, function(_a) {
            return [ 2, new Promise(function(res, rej) {
              HttpManager.instance.post(UrlConfig_1.UrlConfig.ACTIVE_BUFF, function(response) {
                var data = JSON.parse(response);
                if ("success" == data.result) {
                  buffer.endTime = data.data[buffer.name];
                  buffer.time = data.data[buffer.name] - ClientManager_1.ClientManager.instance.serverTime;
                  UserManager_1.UserManager.instance.updateZombieValue();
                  res();
                  EventDispatcher_1.EventDispatcher.trigger(GameEvent_1.GameEvent.BUFFER_UPDATE);
                } else {
                  res();
                  WindowManager_1.default.instance.alert(LocalizationManager_1.LocalizationManager.localText("\u6fc0\u6d3bbuff\u9519\u8bef\uff01"));
                }
              }, JSON.stringify({
                type: buffer.id
              }));
            }) ];
          });
        });
      };
      ReqHelper.prototype.tick = function() {
        return __awaiter(this, void 0, Promise, function() {
          return __generator(this, function(_a) {
            return [ 2, new Promise(function(res, rej) {
              var rewards = {};
              var progress = {};
              var user = UserManager_1.UserManager.instance.user;
              var cbr = ClientManager_1.ClientManager.instance.blockHistory;
              if (user) {
                for (var key in user.zmobieMap) {
                  rewards[key] = new Big(user.zmobieMap[key].reward).minus(cbr[key]).toFixed(0);
                  parseInt(rewards[key]) < 0 && console.error("\u5c0f\u9c7c0 ");
                  progress[key] = Math.floor(user.zmobieMap[key].grow);
                }
                for (var key in user.zmobieMap) cbr[key] = user.zmobieMap[key].reward;
                HttpManager.instance.post(UrlConfig_1.UrlConfig.TICK, function(response) {
                  var data = JSON.parse(response);
                  if ("success" == data.result) {
                    ClientManager_1.ClientManager.instance.standardTime = data.data.st;
                    res();
                  } else {
                    rej();
                    WindowManager_1.default.instance.alert("\u5fc3\u8df3\u9519\u8bef\uff01");
                  }
                  console.log("tick \trewards", rewards, ClientManager_1.ClientManager.instance.getTime());
                }, JSON.stringify({
                  t: Date.now(),
                  earings: rewards,
                  process: progress
                }));
              }
            }) ];
          });
        });
      };
      ReqHelper.prototype.breakout = function(id) {
        return __awaiter(this, void 0, Promise, function() {
          return __generator(this, function(_a) {
            return [ 2, new Promise(function(res, rej) {
              HttpManager.instance.post(UrlConfig_1.UrlConfig.BREAKOUT, function(response) {
                var data = JSON.parse(response);
                "success" == data.result ? res(data) : WindowManager_1.default.instance.alert(LocalizationManager_1.LocalizationManager.localText("\u50f5\u5c38\u7a81\u7834\u9519\u8bef\uff01"));
              }, {
                petId: id
              });
            }) ];
          });
        });
      };
      ReqHelper.prototype.getDoubleOfflineReward = function() {
        return __awaiter(this, void 0, Promise, function() {
          return __generator(this, function(_a) {
            return [ 2, new Promise(function(res, rej) {
              HttpManager.instance.post(UrlConfig_1.UrlConfig.DOUBLEOFFEARNINGS, function(response) {
                var data = JSON.parse(response);
                if ("success" == data.result) {
                  for (var i = 1; i < 10; i++) ClientManager_1.ClientManager.instance.offlineReward[i] = data.data.offearnings[i];
                  for (var key in UserManager_1.UserManager.instance.user.zmobieMap) {
                    var zvo = UserManager_1.UserManager.instance.user.zmobieMap[key];
                    zvo.reward = new Big(zvo.reward).plus(data.data.offearnings[key]).toFixed(0);
                  }
                  res();
                } else {
                  EventDispatcher_1.EventDispatcher.trigger(GameEvent_1.GameEvent.WONDOW_OPEN, {
                    win: WindowConfig_1.WindowConfig.ALERT,
                    params: LocalizationManager_1.LocalizationManager.localText("\u9886\u53d6\u53cc\u500d\u5956\u52b1\u5931\u8d25\uff01")
                  });
                  rej();
                }
              }, {
                code: "061X44TR15R6T71mRTWR1MD7TR1X44Tq"
              });
            }) ];
          });
        });
      };
      ReqHelper.prototype.buy = function(item) {
        return __awaiter(this, void 0, Promise, function() {
          return __generator(this, function(_a) {
            return [ 2, new Promise(function(res, rej) {
              HttpManager.instance.post(UrlConfig_1.UrlConfig.BUY, function(response) {
                var data = JSON.parse(response);
                if ("success" == data.result) {
                  UserManager_1.UserManager.instance.user.subCurrency(item.cost, item.costType);
                  res({
                    item: item,
                    result: data
                  });
                } else EventDispatcher_1.EventDispatcher.trigger(GameEvent_1.GameEvent.WONDOW_OPEN, {
                  win: WindowConfig_1.WindowConfig.ALERT,
                  params: LocalizationManager_1.LocalizationManager.localText("\u8d2d\u4e70\u5931\u8d25\uff01")
                });
              }, {
                id: item.id
              });
            }) ];
          });
        });
      };
      return ReqHelper;
    }();
    exports.ReqHelper = ReqHelper;
    cc._RF.pop();
  }, {
    "../data/ClientManager": "ClientManager",
    "../data/ConfigManager": "ConfigManager",
    "../data/LocalizationManager": "LocalizationManager",
    "../data/UserManager": "UserManager",
    "../data/config/BufferConfig": "BufferConfig",
    "../data/config/UrlConfig": "UrlConfig",
    "../data/config/WindowConfig": "WindowConfig",
    "../event/EventDispatcher": "EventDispatcher",
    "../event/GameEvent": "GameEvent",
    "../utils/Base64": "Base64",
    "../window/manager/WindowManager": "WindowManager",
    "./HttpProxy": "HttpProxy"
  } ],
  HttpProxy: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6192clg6O5AgbKKJGpP3JYL", "HttpProxy");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var HttpProxy = function() {
      function HttpProxy() {
        this.xhr = cc.loader.getXMLHttpRequest();
      }
      HttpProxy.prototype.open = function(url, method, data) {
        void 0 === method && (method = HttpProxy.GET);
        this.method = method || "get";
        "get" == this.method && data && (url = this.spliceUrl(url, data));
        this.url = url;
        this.data = data;
        this.xhr.open(method, url, true);
        return this;
      };
      HttpProxy.prototype.openGet = function(url, data) {
        this.open(url, HttpProxy.GET, data);
        return this;
      };
      HttpProxy.prototype.openPost = function(url, callback, data) {
        this.open(url, HttpProxy.POST, data);
        this.setRequestHeader({
          "Content-Type": "application/json"
        });
        this.onComplete(callback);
        this.send(data);
        return this;
      };
      HttpProxy.prototype.onComplete = function(callback, target) {
        this.target = target;
        this._onComplete = callback;
        return this;
      };
      HttpProxy.prototype.onError = function(callback, target) {
        this.target = target;
        this._onError = callback;
        return this;
      };
      HttpProxy.prototype.send = function(data) {
        data = data || this.data;
        if ("object" === typeof data) try {
          data = JSON.stringify(data);
        } catch (e) {
          console.error(e);
        }
        this.xhr.onreadystatechange = this.onReadyStateChange.bind(this);
        this.xhr.send(data);
      };
      HttpProxy.prototype.onReadyStateChange = function() {
        var xhr = this.xhr;
        if (4 == xhr.readyState) {
          var ioError_1 = xhr.status >= 400 || 0 == xhr.status;
          var url_1 = this.url;
          var self_1 = this;
          if (ioError_1) if (this._onError) this._onError(); else {
            var error = {
              code: this.xhr.status,
              text: ""
            };
            this._onComplete && this._onComplete.call(this.target ? this.target : null, "status: " + this.xhr.status);
          } else this.xhr.readyState == XMLHttpRequest.DONE && (this.xhr.status >= 200 && this.xhr.status < 400 ? this._onComplete && this._onComplete.call(this.target ? this.target : null, this.xhr.response) : this._onComplete && this._onComplete.call(this.target ? this.target : null, "status: " + this.xhr.status));
        }
      };
      HttpProxy.prototype.abort = function() {
        this.xhr && this.xhr.abort();
      };
      HttpProxy.prototype.setRequestHeader = function(data) {
        try {
          for (var key in data) this.xhr.setRequestHeader(key, data[key]);
        } catch (e) {
          console.error(e);
        }
        return this;
      };
      HttpProxy.prototype.getAllResponseHeaders = function() {
        if (!this.xhr) return null;
        var result = this.xhr.getAllResponseHeaders();
        return result || "";
      };
      HttpProxy.prototype.onDestroy = function() {};
      HttpProxy.prototype.spliceUrl = function(url, data) {
        var dataStr = "";
        for (var key in data) dataStr += key + "=" + data[key] + "&";
        dataStr = dataStr.substr(0, dataStr.length - 1);
        dataStr.length > 2 && (url += url.indexOf("?") < 0 ? "?" + dataStr : url + dataStr);
        return url;
      };
      HttpProxy.GET = "get";
      HttpProxy.POST = "post";
      return HttpProxy;
    }();
    exports.HttpProxy = HttpProxy;
    cc._RF.pop();
  }, {} ],
  IBlockStateMachine: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2ab88ypJJZCgJAbG5Gn3/nG", "IBlockStateMachine");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    cc._RF.pop();
  }, {} ],
  IBlockState: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "372ecQpVyZLzIQ3rVSYht32", "IBlockState");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    cc._RF.pop();
  }, {} ],
  IEntity: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "17ca8kvEThHJ7aR40jkhO9R", "IEntity");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    cc._RF.pop();
  }, {} ],
  IHttp: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "386658FZU1Hq79ruUVHMijD", "IHttp");
    cc._RF.pop();
  }, {} ],
  IInteractState: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0a33bZ4gNBAX6fj0dPY/nse", "IInteractState");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    cc._RF.pop();
  }, {} ],
  IMessageHandler: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2ce7cE56dlKgILQ5fnfR3gb", "IMessageHandler");
    cc._RF.pop();
  }, {} ],
  IPlatform: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3c1f5KOrF5CsqAK44Er7y2o", "IPlatform");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    cc._RF.pop();
  }, {} ],
  IShowGoods: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ac61bqaO/VI9o4mDv/AzzX5", "IShowGoods");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    cc._RF.pop();
  }, {} ],
  IStateMachine: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "222a7s50aBKKoUYfKkGYHk2", "IStateMachine");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    cc._RF.pop();
  }, {} ],
  IState: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "843044l9JxOh7apZCznbq20", "IState");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    cc._RF.pop();
  }, {} ],
  IUpdateState: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "23035hoGwFHvYT0EOwP9Ziv", "IUpdateState");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    cc._RF.pop();
  }, {} ],
  IWindowState: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "285ddvzoWhMVJMA1OuO7v1p", "IWindowState");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    cc._RF.pop();
  }, {} ],
  IWindow: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c4a83BB3hlGWZAAqcjUvjXD", "IWindow");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    cc._RF.pop();
  }, {} ],
  LoadingScene: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1c287OgKANGIYdkMLo49iqe", "LoadingScene");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var EventDispatcher_1 = require("../../Script/event/EventDispatcher");
    var GameEvent_1 = require("../../Script/event/GameEvent");
    var ConfigManager_1 = require("../../Script/data/ConfigManager");
    var HttpManager_1 = require("../../Script/net/HttpManager");
    var ClientManager_1 = require("../../Script/data/ClientManager");
    var UserManager_1 = require("../../Script/data/UserManager");
    var AssetsConfig_1 = require("../../Script/data/config/AssetsConfig");
    var WindowManager_1 = require("../../Script/window/manager/WindowManager");
    var PlatformManager_1 = require("../../Script/platform/PlatformManager");
    var LocalizationManager_1 = require("../../Script/data/LocalizationManager");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var LoadingScene = function(_super) {
      __extends(LoadingScene, _super);
      function LoadingScene() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.label = null;
        _this.loadePb = null;
        _this.current = 0;
        return _this;
      }
      LoadingScene.prototype.onLoad = function() {
        console.time("\u52a0\u8f7dgameScene");
        this.loadePb.progress = 0;
        cc.director.preloadScene("gameScene");
        console.timeEnd("\u52a0\u8f7dgameScene");
      };
      LoadingScene.prototype.start = function() {
        EventDispatcher_1.EventDispatcher.on(GameEvent_1.GameEvent.PLATFORM_CUCCSEE, this.onPlatformResult, this);
        EventDispatcher_1.EventDispatcher.on(GameEvent_1.GameEvent.CONFIG_CLIENT_COMPLETE, this.onConfigComplete, this);
        ConfigManager_1.ConfigManager.instance.init();
      };
      LoadingScene.prototype.update = function(dt) {
        if (this.current < 1) {
          this.current += .003 * Math.random();
          this.loadePb.progress = this.current;
        }
      };
      LoadingScene.prototype.onPlatformResult = function(data) {
        return __awaiter(this, void 0, Promise, function() {
          return __generator(this, function(_a) {
            if (0 == data.eventData.result) this.connection2Server(); else {
              console.error("\u5e73\u53f0\u9a8c\u8bc1\u5931\u8d25");
              WindowManager_1.default.instance.alert("\u5e73\u53f0\u9a8c\u8bc1\u5931\u8d25");
            }
            return [ 2 ];
          });
        });
      };
      LoadingScene.prototype.connection2Server = function() {
        return __awaiter(this, void 0, Promise, function() {
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              return [ 4, LocalizationManager_1.LocalizationManager.instance.loadLocalLanguage() ];

             case 1:
              _a.sent();
              return [ 4, LocalizationManager_1.LocalizationManager.instance.loadLocalAssets() ];

             case 2:
              _a.sent();
              return [ 4, HttpManager_1.HttpManager.instance.reqHelper.login() ];

             case 3:
              _a.sent();
              return [ 4, HttpManager_1.HttpManager.instance.reqHelper.getConfig() ];

             case 4:
              _a.sent();
              return [ 4, this.preloading() ];

             case 5:
              _a.sent();
              cc.director.loadScene("gameScene", function() {
                HttpManager_1.HttpManager.instance.reqHelper.getUserInfo(ClientManager_1.ClientManager.instance.openid);
              });
              return [ 2 ];
            }
          });
        });
      };
      LoadingScene.prototype.onConfigComplete = function() {
        WindowManager_1.default.instance.init();
        UserManager_1.UserManager.instance.init();
        PlatformManager_1.PlatformManager.instance.init();
        LocalizationManager_1.LocalizationManager.instance.init();
      };
      LoadingScene.prototype.preloading = function() {
        return __awaiter(this, void 0, Promise, function() {
          return __generator(this, function(_a) {
            return [ 2, new Promise(function(res, rej) {
              var count = 0;
              ConfigManager_1.ConfigManager.instance.clientConfig.config.zombie.forEach(function(element) {
                cc.loader.loadRes(AssetsConfig_1.AssetsConfig.ZOMBIE_ANIMITION + element.animi, function(error, data) {
                  count++;
                  if (error) {
                    console.error("\u52a0\u8f7d\u52a8\u753b\u9519\u8bef", error);
                    rej();
                  }
                  count >= ConfigManager_1.ConfigManager.instance.clientConfig.config.zombie.length && res();
                });
              });
            }) ];
          });
        });
      };
      __decorate([ property(cc.Label) ], LoadingScene.prototype, "label", void 0);
      __decorate([ property(cc.ProgressBar) ], LoadingScene.prototype, "loadePb", void 0);
      LoadingScene = __decorate([ ccclass ], LoadingScene);
      return LoadingScene;
    }(cc.Component);
    exports.default = LoadingScene;
    cc._RF.pop();
  }, {
    "../../Script/data/ClientManager": "ClientManager",
    "../../Script/data/ConfigManager": "ConfigManager",
    "../../Script/data/LocalizationManager": "LocalizationManager",
    "../../Script/data/UserManager": "UserManager",
    "../../Script/data/config/AssetsConfig": "AssetsConfig",
    "../../Script/event/EventDispatcher": "EventDispatcher",
    "../../Script/event/GameEvent": "GameEvent",
    "../../Script/net/HttpManager": "HttpManager",
    "../../Script/platform/PlatformManager": "PlatformManager",
    "../../Script/window/manager/WindowManager": "WindowManager"
  } ],
  LocalPlatform: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0fc980N1YJNz5eI3/FbaYnl", "LocalPlatform");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var EventDispatcher_1 = require("../../event/EventDispatcher");
    var GameEvent_1 = require("../../event/GameEvent");
    var LocalPlatform = function() {
      function LocalPlatform() {}
      LocalPlatform.prototype.init = function(data) {
        this.getUserInfo();
      };
      LocalPlatform.prototype.getUserInfo = function() {
        this.locale = "cn-zh";
        EventDispatcher_1.EventDispatcher.trigger(GameEvent_1.GameEvent.PLATFORM_CUCCSEE, {
          result: 0,
          code: "asdf"
        });
      };
      LocalPlatform.prototype.playAd = function(callback) {
        callback();
      };
      LocalPlatform.prototype.getLeaderboard = function(callback) {};
      LocalPlatform.prototype.onPause = function(callback) {};
      LocalPlatform.prototype.share = function(text, img) {
        return __awaiter(this, void 0, Promise, function() {
          return __generator(this, function(_a) {
            return [ 2, new Promise(function(res, rej) {
              res();
            }) ];
          });
        });
      };
      LocalPlatform.prototype.updateRank = function(data) {};
      return LocalPlatform;
    }();
    exports.LocalPlatform = LocalPlatform;
    cc._RF.pop();
  }, {
    "../../event/EventDispatcher": "EventDispatcher",
    "../../event/GameEvent": "GameEvent"
  } ],
  LocalProxy: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c7f0fuamqBDkK5h2XUKRdZq", "LocalProxy");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var UserManager_1 = require("../data/UserManager");
    var UrlConfig_1 = require("../data/config/UrlConfig");
    var LocalProxy = function() {
      function LocalProxy() {}
      LocalProxy.prototype.onComplete = function(callback, target) {
        return;
      };
      LocalProxy.prototype.onDestroy = function() {};
      LocalProxy.prototype.open = function(url, method, data) {
        return;
      };
      LocalProxy.prototype.send = function(data) {};
      LocalProxy.prototype.openPost = function(url, callback, data) {
        var _this = this;
        var vo = UserManager_1.UserManager.instance.user;
        switch (url) {
         case UrlConfig_1.UrlConfig.LOGIN:
          callback(this.resultWarper({
            id: 1000001
          }));
          break;

         case UrlConfig_1.UrlConfig.HARVEST:
          vo.coin += data.coin;
          callback(this.resultWarper({
            data: vo
          }));
          break;

         case UrlConfig_1.UrlConfig.UPLEVEL:
          vo.exp += 1;
          if (vo.exp > vo.totalExp) {
            vo.level += 1;
            vo.totalExp += 10;
            vo.exp = 0;
          }
          var zombie = data.vo;
          zombie.level += 1;
          zombie.stageExp += 1;
          if (zombie.stageExp >= zombie.stageUpMax) {
            zombie.breakout += 1;
            zombie.stageExp = 0;
          }
          callback(this.resultWarper({
            data: zombie,
            user: vo
          }));
          break;

         case UrlConfig_1.UrlConfig.UNLOCK:
          data.level += 1;
          callback(this.resultWarper({
            data: new Date(),
            id: data.id
          }));
          break;

         case UrlConfig_1.UrlConfig.WELFARE:
          var type = Math.random() > .5;
          callback(type ? this.resultWarper({
            type: type,
            coin: this.randomCoin()
          }) : this.resultWarper({
            type: type,
            list: [ this.randomReward(), this.randomReward(), this.randomReward() ]
          }));
          break;

         case UrlConfig_1.UrlConfig.CONFIG:
          cc.loader.loadRes("config/zombieConfig", function(err, data) {
            err && callback({
              result: 1,
              message: "\u83b7\u53d6\u7528\u6237\u4fe1\u606f\u5931\u8d25"
            });
            _this.config = data.json;
            callback(_this.resultWarper({
              data: data.json
            }));
          });
          break;

         case UrlConfig_1.UrlConfig.USERINFO:
          callback(this.resultWarper({
            user: this.config.user
          }));
          break;

         case UrlConfig_1.UrlConfig.SHOP_INFO:
          callback(this.resultWarper({
            info: this.config.shop
          }));
        }
      };
      LocalProxy.prototype.randomCoin = function() {
        return Math.floor(Math.random() * UserManager_1.UserManager.instance.user.coin);
      };
      LocalProxy.prototype.randomCard = function() {
        var list = [];
        UserManager_1.UserManager.instance.user.levelMap.forEach(function(element) {
          element.level > 0 && list.push(element.id);
        });
        return list[Math.floor(Math.random() * list.length)];
      };
      LocalProxy.prototype.randomReward = function() {
        if (UserManager_1.UserManager.instance.user.levelMap.length < 1 || UserManager_1.UserManager.instance.user.levelMap[0].level < 1) return this.randomCoin();
        return Math.random() > .5 ? this.randomCoin() : this.randomCard();
      };
      LocalProxy.prototype.resultWarper = function(data) {
        data.result = "success";
        return JSON.stringify(data);
      };
      return LocalProxy;
    }();
    exports.LocalProxy = LocalProxy;
    cc._RF.pop();
  }, {
    "../data/UserManager": "UserManager",
    "../data/config/UrlConfig": "UrlConfig"
  } ],
  LocalizationManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "30266+DcMpP8J4Mpq1ZQjdV", "LocalizationManager");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var AssetsManager_1 = require("./AssetsManager");
    var AssetsConfig_1 = require("./config/AssetsConfig");
    var PlatformManager_1 = require("../platform/PlatformManager");
    var LocalizationManager = function() {
      function LocalizationManager() {
        this.languageMap = {};
      }
      Object.defineProperty(LocalizationManager, "instance", {
        get: function() {
          null == LocalizationManager._instance && (LocalizationManager._instance = new LocalizationManager());
          return LocalizationManager._instance;
        },
        enumerable: true,
        configurable: true
      });
      LocalizationManager.prototype.init = function() {};
      LocalizationManager.prototype.loadLocalLanguage = function() {
        return __awaiter(this, void 0, Promise, function() {
          var _this = this;
          return __generator(this, function(_a) {
            return [ 2, new Promise(function(res, rej) {
              AssetsManager_1.AssetsManager.instance.loadRes(AssetsConfig_1.AssetsConfig.LANGUAGE + PlatformManager_1.PlatformManager.instance.current.locale).then(function(value) {
                _this.languageMap = value.json;
                res();
              });
            }) ];
          });
        });
      };
      LocalizationManager.prototype.loadLocalAssets = function() {
        return __awaiter(this, void 0, Promise, function() {
          return __generator(this, function(_a) {
            return [ 2, new Promise(function(res, rej) {
              res();
            }) ];
          });
        });
      };
      LocalizationManager.localText = function(key) {
        if (LocalizationManager.instance.languageMap[key]) return LocalizationManager.instance.languageMap[key];
        return key;
      };
      return LocalizationManager;
    }();
    exports.LocalizationManager = LocalizationManager;
    cc._RF.pop();
  }, {
    "../platform/PlatformManager": "PlatformManager",
    "./AssetsManager": "AssetsManager",
    "./config/AssetsConfig": "AssetsConfig"
  } ],
  LoginScene: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f7408jV+YNPKq7UrbDj7SeV", "LoginScene");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var ClientManager_1 = require("../../Script/data/ClientManager");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var LoginScene = function(_super) {
      __extends(LoginScene, _super);
      function LoginScene() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.inputBox = null;
        _this.tokeninputBox = null;
        return _this;
      }
      LoginScene.prototype.onLoad = function() {};
      LoginScene.prototype.start = function() {};
      LoginScene.prototype.onClick = function() {
        ClientManager_1.ClientManager.instance.openid = this.inputBox.string;
        ClientManager_1.ClientManager.instance.token = this.tokeninputBox.string;
        cc.director.loadScene("loadingScene");
      };
      __decorate([ property(cc.EditBox) ], LoginScene.prototype, "inputBox", void 0);
      __decorate([ property(cc.EditBox) ], LoginScene.prototype, "tokeninputBox", void 0);
      LoginScene = __decorate([ ccclass ], LoginScene);
      return LoginScene;
    }(cc.Component);
    exports.default = LoginScene;
    cc._RF.pop();
  }, {
    "../../Script/data/ClientManager": "ClientManager"
  } ],
  NumUtils: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "73272xRzthBwK1EU30IzYUg", "NumUtils");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var ClientManager_1 = require("../data/ClientManager");
    var NumUtils = function() {
      function NumUtils() {}
      NumUtils.num2Coin = function(num) {
        "number" == typeof num && (num = Math.floor(num));
        var num_str = num.toString();
        var num_len = num_str.length;
        var num_slj = Math.floor((num_len - 1) / 3);
        var unit = NumUtils.unitList[num_slj];
        var final_num;
        final_num = num_len % 3 == 0 || num_len < 3 ? num_str.substring(0, 3) : num_str.substring(0, num_len % 3) + "." + num_str.substring(num_len % 3, 3);
        return final_num + unit;
      };
      NumUtils.getCoin = function(userData) {
        var temp = ClientManager_1.ClientManager.instance.userData.substring(userData.indexOf("coin"));
        return temp.substring(6, temp.indexOf(","));
      };
      NumUtils.getBigNum = function(key) {
        var uds = ClientManager_1.ClientManager.instance.userData;
        var begin = uds.indexOf(key);
        if (begin > -1) {
          var temp = uds.substring(begin);
          return temp.substring(key.length + 2, temp.indexOf(","));
        }
        console.error("user data not include", key);
        return "0";
      };
      NumUtils.unitList = [ "", "K", "M", "B", "T", "aa", "bb", "cc", "dd", "ee", "ff", "gg", "hh", "ii", "jj", "kk", "ii", "mm", "nn", "oo", "pp", "qq", "rr", "ss", "tt", "uu", "vv", "ww", "xx", "yy", "zz", "Aa", "Bb" ];
      return NumUtils;
    }();
    exports.NumUtils = NumUtils;
    cc._RF.pop();
  }, {
    "../data/ClientManager": "ClientManager"
  } ],
  OtherConfig: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "65a44hCtmJI2atvOSsnSnAF", "OtherConfig");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var OtherConfig = function() {
      function OtherConfig() {}
      OtherConfig.DOUBLE_EFFICIENCY = "doubleEfficiency";
      OtherConfig.DOUBLE_REVENUE = "doubleRevenue";
      return OtherConfig;
    }();
    exports.OtherConfig = OtherConfig;
    var ProtoConfig = function() {
      function ProtoConfig() {}
      ProtoConfig.GETCARD_DALIYCARD = "card";
      ProtoConfig.GETCARD_BOMBZOMBIE = "bomb";
      return ProtoConfig;
    }();
    exports.ProtoConfig = ProtoConfig;
    var CurrencyType = function() {
      function CurrencyType() {}
      CurrencyType.RMB = 1;
      CurrencyType.JEWEL = 2;
      CurrencyType.COIN = 3;
      return CurrencyType;
    }();
    exports.CurrencyType = CurrencyType;
    var PropertyKey = function() {
      function PropertyKey() {}
      PropertyKey.COIN = "coin";
      PropertyKey.ZOMBIE_EARNINGS = "zombieEarnings";
      PropertyKey.ZOMBIE_LEVEL = "zombieLevel";
      PropertyKey.ZOMBIE_BREAKOUT = "zombieBreakout";
      PropertyKey.ZOMBIE_AUTO = "zombieAuto";
      PropertyKey.ZOMBIE_CARD = "zombieCard";
      PropertyKey.ZOMBIE_PROCESS = "zombieProcess";
      return PropertyKey;
    }();
    exports.PropertyKey = PropertyKey;
    var VipKey = function() {
      function VipKey() {}
      VipKey.VIP_ID_MAP = {
        0: 0,
        1: 1,
        2: 2,
        3: 3
      };
      return VipKey;
    }();
    exports.VipKey = VipKey;
    cc._RF.pop();
  }, {} ],
  PlatformManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0e6a8XziN5Nwb980EtzOWey", "PlatformManager");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var WxPlatform_1 = require("./channel/WxPlatform");
    var PlatformType_1 = require("./PlatformType");
    var FbPlatform_1 = require("./channel/FbPlatform");
    var LocalPlatform_1 = require("./channel/LocalPlatform");
    var PlatformManager = function() {
      function PlatformManager() {
        if (window.wx) {
          this.platformName = PlatformType_1.default.WX;
          console.log("window.wx");
        } else if (window.FBInstant) {
          this.platformName = PlatformType_1.default.FB;
          console.log("window.FBInstant");
        } else {
          this.platformName = PlatformType_1.default.NIL;
          console.log("window.null");
        }
      }
      Object.defineProperty(PlatformManager, "instance", {
        get: function() {
          null == PlatformManager._instance && (PlatformManager._instance = new PlatformManager());
          return PlatformManager._instance;
        },
        enumerable: true,
        configurable: true
      });
      PlatformManager.prototype.init = function() {
        switch (this.platformName) {
         case PlatformType_1.default.WX:
          this.current = new WxPlatform_1.WxPlatform();
          break;

         case PlatformType_1.default.NIL:
          this.current = new LocalPlatform_1.LocalPlatform();
          break;

         case PlatformType_1.default.FB:
          this.current = new FbPlatform_1.FbPlatform();
        }
        this.current.init();
      };
      return PlatformManager;
    }();
    exports.PlatformManager = PlatformManager;
    cc._RF.pop();
  }, {
    "./PlatformType": "PlatformType",
    "./channel/FbPlatform": "FbPlatform",
    "./channel/LocalPlatform": "LocalPlatform",
    "./channel/WxPlatform": "WxPlatform"
  } ],
  PlatformType: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "193d0b1p3tD7aCxNLboaVDU", "PlatformType");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var default_1 = function() {
      function default_1() {}
      default_1.WX = "wx";
      default_1.FB = "facebook";
      default_1.NIL = "nil";
      return default_1;
    }();
    exports.default = default_1;
    cc._RF.pop();
  }, {} ],
  RankRenderer: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6dcdedmPB9CCazvFzhVWZOP", "RankRenderer");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var NumUtils_1 = require("../../utils/NumUtils");
    var LocalizationManager_1 = require("../../data/LocalizationManager");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var RankRenderer = function(_super) {
      __extends(RankRenderer, _super);
      function RankRenderer() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.rankLabel = null;
        _this.nameLabel = null;
        _this.rewardLabel = null;
        _this.rank1Sprite = null;
        _this.rank2Sprite = null;
        _this.rank3Sprite = null;
        _this.headSprite = null;
        return _this;
      }
      RankRenderer.prototype.onLoad = function() {};
      RankRenderer.prototype.start = function() {};
      RankRenderer.prototype.fillData = function(vo) {
        this.rank1Sprite.node.opacity = 0;
        this.rank2Sprite.node.opacity = 0;
        this.rank3Sprite.node.opacity = 0;
        this.info = vo;
        if (vo.index < 4) {
          this["rank" + vo.index + "Sprite"].node.opacity = 255;
          this.rankLabel.node.opacity = 0;
        } else this.rankLabel.string = vo.index.toString();
        this.nameLabel.string = vo.name;
        this.rewardLabel.string = LocalizationManager_1.LocalizationManager.localText("\u4ea7\u80fd\uff1a") + NumUtils_1.NumUtils.num2Coin(vo.reward);
      };
      __decorate([ property(cc.Label) ], RankRenderer.prototype, "rankLabel", void 0);
      __decorate([ property(cc.Label) ], RankRenderer.prototype, "nameLabel", void 0);
      __decorate([ property(cc.Label) ], RankRenderer.prototype, "rewardLabel", void 0);
      __decorate([ property(cc.Sprite) ], RankRenderer.prototype, "rank1Sprite", void 0);
      __decorate([ property(cc.Sprite) ], RankRenderer.prototype, "rank2Sprite", void 0);
      __decorate([ property(cc.Sprite) ], RankRenderer.prototype, "rank3Sprite", void 0);
      __decorate([ property(cc.Sprite) ], RankRenderer.prototype, "headSprite", void 0);
      RankRenderer = __decorate([ ccclass ], RankRenderer);
      return RankRenderer;
    }(cc.Component);
    exports.default = RankRenderer;
    cc._RF.pop();
  }, {
    "../../data/LocalizationManager": "LocalizationManager",
    "../../utils/NumUtils": "NumUtils"
  } ],
  RankVo: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "efdc1JbPxRACaTwQoVDl4Lt", "RankVo");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var RankVo = function() {
      function RankVo() {}
      return RankVo;
    }();
    exports.RankVo = RankVo;
    cc._RF.pop();
  }, {} ],
  RankWin: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "80039qP0aNMAY36Y5FMU81k", "RankWin");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var RankVo_1 = require("../../data/vo/RankVo");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var RankWin = function(_super) {
      __extends(RankWin, _super);
      function RankWin() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.itemPrefab = null;
        _this.content = null;
        return _this;
      }
      RankWin.prototype.onLoad = function() {
        for (var i = 1; i < 10; i++) {
          var renderer = cc.instantiate(this.itemPrefab);
          var sc = renderer.getComponent("RankRenderer");
          var vo = new RankVo_1.RankVo();
          vo.index = i;
          vo.reward = 1e5 * Math.random();
          vo.name = String(Math.random() * i);
          vo.url = "http://himg.bdimg.com/sys/portrait/item/7bb4737874616f73646f960b.jpg";
          sc.fillData(vo);
          this.content.addChild(renderer);
        }
      };
      RankWin.prototype.start = function() {
        this.list = [];
      };
      __decorate([ property(cc.Prefab) ], RankWin.prototype, "itemPrefab", void 0);
      __decorate([ property(cc.Node) ], RankWin.prototype, "content", void 0);
      RankWin = __decorate([ ccclass ], RankWin);
      return RankWin;
    }(cc.Component);
    exports.default = RankWin;
    cc._RF.pop();
  }, {
    "../../data/vo/RankVo": "RankVo"
  } ],
  RewardRenderer: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "81940JEA6FEaZqplAQ3MZCF", "RewardRenderer");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var AssetsManager_1 = require("../../data/AssetsManager");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var RewardRenderer = function(_super) {
      __extends(RewardRenderer, _super);
      function RewardRenderer() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.nameLabel = null;
        _this.numLabel = null;
        _this.iconSprite = null;
        return _this;
      }
      RewardRenderer.prototype.start = function() {};
      RewardRenderer.prototype.fillData = function(data, num, root) {
        this.info = data;
        this.nameLabel.string = data.name;
        this.numLabel.string = num.toString();
        AssetsManager_1.AssetsManager.instance.loadSpriteFrame(this.iconSprite, root + this.info.url);
      };
      __decorate([ property(cc.Label) ], RewardRenderer.prototype, "nameLabel", void 0);
      __decorate([ property(cc.Label) ], RewardRenderer.prototype, "numLabel", void 0);
      __decorate([ property(cc.Sprite) ], RewardRenderer.prototype, "iconSprite", void 0);
      RewardRenderer = __decorate([ ccclass ], RewardRenderer);
      return RewardRenderer;
    }(cc.Component);
    exports.default = RewardRenderer;
    cc._RF.pop();
  }, {
    "../../data/AssetsManager": "AssetsManager"
  } ],
  ShopClassRenderer: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "84f8a+Yte5BnZ4NuL3v01CS", "ShopClassRenderer");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var ShopClassRenderer = function(_super) {
      __extends(ShopClassRenderer, _super);
      function ShopClassRenderer() {
        var _this = _super.call(this) || this;
        _this.titleLabel = null;
        _this.content = null;
        _this.itemPrefab = null;
        _this.list = [];
        return _this;
      }
      ShopClassRenderer.prototype.start = function() {};
      ShopClassRenderer.prototype.fillData = function(vo) {
        var _this = this;
        this.titleLabel.string = vo.name;
        vo.list.forEach(function(element) {
          var renderer = cc.instantiate(_this.itemPrefab);
          renderer.getComponent("ShopRenderer").fillData(element);
          _this.content.addChild(renderer);
          _this.list.push(renderer);
        });
      };
      ShopClassRenderer.prototype.onUpdate = function() {
        this.list.forEach(function(element) {
          element.getComponent("ShopRenderer").onUpdate();
        });
      };
      __decorate([ property(cc.Label) ], ShopClassRenderer.prototype, "titleLabel", void 0);
      __decorate([ property(cc.Node) ], ShopClassRenderer.prototype, "content", void 0);
      __decorate([ property(cc.Prefab) ], ShopClassRenderer.prototype, "itemPrefab", void 0);
      ShopClassRenderer = __decorate([ ccclass ], ShopClassRenderer);
      return ShopClassRenderer;
    }(cc.Component);
    exports.default = ShopClassRenderer;
    cc._RF.pop();
  }, {} ],
  ShopClassVo: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f62a8B14VdKE6PyFt4Cqsbn", "ShopClassVo");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var ShopItemVo_1 = require("./ShopItemVo");
    var ShopClassVo = function() {
      function ShopClassVo() {
        this.list = [];
      }
      ShopClassVo.prototype.decode = function(data, typeName) {
        var _this = this;
        this.type = data.type;
        this.name = typeName;
        data.forEach(function(element) {
          var vo = new ShopItemVo_1.ShopItemVo();
          vo.decode(element);
          _this.list.push(vo);
        });
      };
      return ShopClassVo;
    }();
    exports.ShopClassVo = ShopClassVo;
    cc._RF.pop();
  }, {
    "./ShopItemVo": "ShopItemVo"
  } ],
  ShopItemVo: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "8d1d7sky4lKhZKqpUOYhZAc", "ShopItemVo");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var ShopItemVo = function() {
      function ShopItemVo() {}
      ShopItemVo.prototype.decode = function(data) {
        this.name = data.name;
        this.type = data.type;
        this.id = data.id;
        this.desc = data.tips;
        this.cost = data.cost;
        this.url = data.url;
        this.costType = data.costType;
        this.isOpen = data.isOpen;
        this.para = data.para;
        this.paraType = data.paraType;
      };
      return ShopItemVo;
    }();
    exports.ShopItemVo = ShopItemVo;
    cc._RF.pop();
  }, {} ],
  ShopRendererStates: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d482dGL3oBI9pGfBXnqJNUc", "ShopRendererStates");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var NumUtils_1 = require("../../../utils/NumUtils");
    var AssetsManager_1 = require("../../../data/AssetsManager");
    var AssetsConfig_1 = require("../../../data/config/AssetsConfig");
    var UserManager_1 = require("../../../data/UserManager");
    var HttpManager_1 = require("../../../net/HttpManager");
    var WindowManager_1 = require("../../manager/WindowManager");
    var LocalizationManager_1 = require("../../../data/LocalizationManager");
    var WindowConfig_1 = require("../../../data/config/WindowConfig");
    var OtherConfig_1 = require("../../../data/config/OtherConfig");
    var ConfigManager_1 = require("../../../data/ConfigManager");
    var EventDispatcher_1 = require("../../../event/EventDispatcher");
    var GameEvent_1 = require("../../../event/GameEvent");
    var ShopRendererInitStates = function() {
      function ShopRendererInitStates() {}
      ShopRendererInitStates.prototype.onEnter = function(data) {
        var _this = this;
        this.owner = data;
        this.owner.state2Node.active = false;
        this.owner.titleLabel.string = this.owner.data.name;
        this.owner.descLabel.string = this.owner.data.desc;
        this.owner.costLabel.string = NumUtils_1.NumUtils.num2Coin(this.owner.data.cost);
        this.owner.data.url ? AssetsManager_1.AssetsManager.instance.loadSpriteFrame(this.owner.iconSprite, AssetsConfig_1.AssetsConfig.SHOP + this.owner.data.url).then(function(value) {
          _this.checkPack() ? _this.owner.staticMachine.changeState(ShopRendererOwnStates) : _this.owner.staticMachine.changeState(ShopRendererReadyStates);
        }) : console.error("ShopRendererReadyStates url is null");
        switch (this.owner.data.costType.toString()) {
         case "1":
          this.owner.goldNode.opacity = 255;
          this.owner.jewelNode.opacity = 0;
          break;

         case "2":
          this.owner.goldNode.opacity = 0;
          this.owner.jewelNode.opacity = 255;
        }
      };
      ShopRendererInitStates.prototype.onExit = function(data) {
        this.owner.node.opacity = 255;
      };
      ShopRendererInitStates.prototype.checkPack = function() {
        switch (this.owner.data.paraType.toString()) {
         case "2":
          if (this.owner.data.id == OtherConfig_1.VipKey.VIP_ID_MAP[UserManager_1.UserManager.instance.user.vip]) return true;
          break;

         case "5":
          if (UserManager_1.UserManager.instance.user.zmobieMap[this.owner.data.para].auto) return true;
        }
        return false;
      };
      ShopRendererInitStates.prototype.onClick = function(data) {};
      ShopRendererInitStates.prototype.update = function(data) {};
      return ShopRendererInitStates;
    }();
    exports.ShopRendererInitStates = ShopRendererInitStates;
    var ShopRendererReadyStates = function() {
      function ShopRendererReadyStates() {
        this.isWaite = false;
      }
      ShopRendererReadyStates.prototype.onEnter = function(data) {
        this.owner = data;
        this.owner.state1Node.active = true;
        this.owner.state2Node.active = false;
        UserManager_1.UserManager.instance.user.isEnough(this.owner.data.cost, this.owner.data.costType) ? this.owner.bgSprite.color = cc.Color.WHITE : this.owner.bgSprite.color = cc.Color.GRAY;
      };
      ShopRendererReadyStates.prototype.onExit = function(data) {};
      ShopRendererReadyStates.prototype.onClick = function(data) {
        var _this = this;
        if (UserManager_1.UserManager.instance.user.isEnough(this.owner.data.cost, this.owner.data.costType)) if (this.isWaite) WindowManager_1.default.instance.alert(LocalizationManager_1.LocalizationManager.localText("\u6240\u9700\u6761\u4ef6\u4e0d\u8db3")); else switch (this.owner.data.paraType.toString()) {
         case "5":
          var result = this.checkAuto();
          if (result) WindowManager_1.default.instance.alert(result); else {
            this.isWaite = true;
            HttpManager_1.HttpManager.instance.reqHelper.buy(this.owner.data).then(function(value) {
              UserManager_1.UserManager.instance.user.subCurrency(value.item.cost, value.item.costType);
              UserManager_1.UserManager.instance.user.zmobieMap[value.item.para].auto = true;
              WindowManager_1.default.instance.open(WindowConfig_1.WindowConfig.WALFARE, {
                params: value.item
              });
              _this.owner.staticMachine.changeState(ShopRendererOwnStates);
              _this.isWaite = false;
            });
          }
          break;

         case "4":
          this.isWaite = true;
          HttpManager_1.HttpManager.instance.reqHelper.buy(this.owner.data).then(function(value) {
            UserManager_1.UserManager.instance.user.subCurrency(value.item.cost, value.item.costType);
            WindowManager_1.default.instance.open(WindowConfig_1.WindowConfig.WALFARE, {
              params: value.result.data.cards
            });
            value.result.data.cards.forEach(function(element) {
              UserManager_1.UserManager.instance.user.cardMap[element] += 1;
            });
            _this.isWaite = false;
          });
          break;

         case "2":
          var vipResult = this.checkVip();
          if (vipResult) WindowManager_1.default.instance.alert(vipResult); else {
            this.isWaite = true;
            HttpManager_1.HttpManager.instance.reqHelper.buy(this.owner.data).then(function(value) {
              UserManager_1.UserManager.instance.user.subCurrency(value.item.cost, value.item.costType);
              WindowManager_1.default.instance.open(WindowConfig_1.WindowConfig.WALFARE, {
                params: value.item
              });
              EventDispatcher_1.EventDispatcher.trigger(GameEvent_1.GameEvent.BUY_SUCCESS, UserManager_1.UserManager.instance.user.vip);
              UserManager_1.UserManager.instance.user.vip = value.item.id;
              UserManager_1.UserManager.instance.updateZombieValue();
              _this.owner.staticMachine.changeState(ShopRendererOwnStates);
              _this.isWaite = false;
            });
          }
          break;

         case "3":
          this.isWaite = true;
          HttpManager_1.HttpManager.instance.reqHelper.buy(this.owner.data).then(function(value) {
            var total = new Big("0");
            for (var key in value.result.data.offEarnings) total = total.plus(value.result.data.offEarnings[key]);
            UserManager_1.UserManager.instance.user.subCurrency(value.item.cost, value.item.costType);
            UserManager_1.UserManager.instance.user.addCurrency(total.toFixed(0));
            WindowManager_1.default.instance.alert(LocalizationManager_1.LocalizationManager.localText("\u8d2d\u4e70\u6210\u529f\uff0c\u83b7\u5f97\u6536\u76ca") + NumUtils_1.NumUtils.num2Coin(total.toFixed(0)));
            _this.isWaite = false;
          });
          break;

         default:
          HttpManager_1.HttpManager.instance.reqHelper.buy(this.owner.data);
        }
      };
      ShopRendererReadyStates.prototype.checkVip = function() {
        if (this.owner.data.para <= ConfigManager_1.ConfigManager.instance.shopMap[UserManager_1.UserManager.instance.user.vip].para) return LocalizationManager_1.LocalizationManager.localText("\u65e0\u6cd5\u8d2d\u4e70\u7b49\u7ea7\u4f4e\u7684VIP\u5361");
        return null;
      };
      ShopRendererReadyStates.prototype.checkAuto = function() {
        if (UserManager_1.UserManager.instance.user.zmobieMap[this.owner.data.para].auto) return LocalizationManager_1.LocalizationManager.localText("\u5f53\u524d\u50f5\u5c38\u7684\u81ea\u52a8\u751f\u4ea7\u5df2\u89e3\u9501");
        if (UserManager_1.UserManager.instance.user.zmobieMap[this.owner.data.para].level < 1) return LocalizationManager_1.LocalizationManager.localText("\u81ea\u52a8\u751f\u4ea7\u6240\u9700\u7684\u50f5\u5c38\u672a\u89e3\u9501");
        var preId = parseInt(this.owner.data.para) - 1;
        if (preId < 1) return null;
        if (false == UserManager_1.UserManager.instance.user.zmobieMap[preId.toString()].auto) return LocalizationManager_1.LocalizationManager.localText("\u81ea\u52a8\u751f\u4ea7\u9700\u8981\u6309\u987a\u5e8f\u8d2d\u4e70");
        return null;
      };
      ShopRendererReadyStates.prototype.update = function(data) {};
      return ShopRendererReadyStates;
    }();
    exports.ShopRendererReadyStates = ShopRendererReadyStates;
    var ShopRendererOwnStates = function() {
      function ShopRendererOwnStates() {}
      ShopRendererOwnStates.prototype.onEnter = function(data) {
        this.owner = data;
        this.owner.state1Node.active = false;
        this.owner.state2Node.active = true;
      };
      ShopRendererOwnStates.prototype.onExit = function(data) {};
      ShopRendererOwnStates.prototype.onClick = function(data) {};
      ShopRendererOwnStates.prototype.update = function(data) {
        switch (this.owner.data.paraType.toString()) {
         case "2":
          this.owner.data.para <= ConfigManager_1.ConfigManager.instance.shopMap[UserManager_1.UserManager.instance.user.vip].para && this.owner.staticMachine.changeState(ShopRendererReadyStates);
        }
      };
      return ShopRendererOwnStates;
    }();
    exports.ShopRendererOwnStates = ShopRendererOwnStates;
    cc._RF.pop();
  }, {
    "../../../data/AssetsManager": "AssetsManager",
    "../../../data/ConfigManager": "ConfigManager",
    "../../../data/LocalizationManager": "LocalizationManager",
    "../../../data/UserManager": "UserManager",
    "../../../data/config/AssetsConfig": "AssetsConfig",
    "../../../data/config/OtherConfig": "OtherConfig",
    "../../../data/config/WindowConfig": "WindowConfig",
    "../../../event/EventDispatcher": "EventDispatcher",
    "../../../event/GameEvent": "GameEvent",
    "../../../net/HttpManager": "HttpManager",
    "../../../utils/NumUtils": "NumUtils",
    "../../manager/WindowManager": "WindowManager"
  } ],
  ShopRenderer: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "10c533c63dH6qss46POjCs2", "ShopRenderer");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var ShopRendererStates_1 = require("./ShopRendererStates");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var ShopRenderer = function(_super) {
      __extends(ShopRenderer, _super);
      function ShopRenderer() {
        var _this = _super.call(this) || this;
        _this.titleLabel = null;
        _this.descLabel = null;
        _this.costLabel = null;
        _this.iconSprite = null;
        _this.goldNode = null;
        _this.state1Node = null;
        _this.state2Node = null;
        _this.jewelNode = null;
        _this.bgSprite = null;
        _this.staticMachine = new StateMachine(_this);
        return _this;
      }
      ShopRenderer.prototype.start = function() {};
      ShopRenderer.prototype.fillData = function(vo) {
        this.data = vo;
        this.staticMachine.changeState(ShopRendererStates_1.ShopRendererInitStates);
      };
      ShopRenderer.prototype.onClick = function() {
        this.staticMachine.cutState.onClick();
      };
      ShopRenderer.prototype.onEnable = function() {
        this.staticMachine.changeState(ShopRendererStates_1.ShopRendererInitStates);
      };
      __decorate([ property(cc.Label) ], ShopRenderer.prototype, "titleLabel", void 0);
      __decorate([ property(cc.Label) ], ShopRenderer.prototype, "descLabel", void 0);
      __decorate([ property(cc.Label) ], ShopRenderer.prototype, "costLabel", void 0);
      __decorate([ property(cc.Sprite) ], ShopRenderer.prototype, "iconSprite", void 0);
      __decorate([ property(cc.Node) ], ShopRenderer.prototype, "goldNode", void 0);
      __decorate([ property(cc.Node) ], ShopRenderer.prototype, "state1Node", void 0);
      __decorate([ property(cc.Node) ], ShopRenderer.prototype, "state2Node", void 0);
      __decorate([ property(cc.Node) ], ShopRenderer.prototype, "jewelNode", void 0);
      __decorate([ property(cc.Node) ], ShopRenderer.prototype, "bgSprite", void 0);
      ShopRenderer = __decorate([ ccclass ], ShopRenderer);
      return ShopRenderer;
    }(cc.Component);
    exports.default = ShopRenderer;
    var StateMachine = function() {
      function StateMachine(owner) {
        this.owner = owner;
        this.instanceMap = {};
      }
      StateMachine.prototype.addGlobalState = function(clazz) {};
      StateMachine.prototype.changeState = function(clazz) {
        if (this.currentClazz == clazz) return;
        this.currentClazz = clazz;
        this.preState && this.preState.onExit(this.owner);
        this.preState = this.cutState;
        this.instanceMap[clazz] || (this.instanceMap[clazz] = new clazz());
        this.cutState = this.instanceMap[clazz];
        this.cutState.onEnter(this.owner);
      };
      StateMachine.prototype.isInState = function(state) {
        if (this.currentClazz == state) return true;
        return false;
      };
      StateMachine.prototype.update = function(dt) {
        this.cutState.update();
      };
      return StateMachine;
    }();
    cc._RF.pop();
  }, {
    "./ShopRendererStates": "ShopRendererStates"
  } ],
  ShopWin: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "11135nbq1pD5acodkJ0iKqm", "ShopWin");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var ConfigManager_1 = require("../../data/ConfigManager");
    var ShopClassVo_1 = require("../../data/vo/ShopClassVo");
    var EventDispatcher_1 = require("../../event/EventDispatcher");
    var GameEvent_1 = require("../../event/GameEvent");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var ShopWin = function(_super) {
      __extends(ShopWin, _super);
      function ShopWin() {
        var _this = _super.call(this) || this;
        _this.contentNode = null;
        _this.classPrefab = null;
        _this.list = [];
        return _this;
      }
      ShopWin.prototype.start = function() {};
      ShopWin.prototype.onEnable = function() {
        if (!this.config) {
          this.config = ConfigManager_1.ConfigManager.instance.shopCondig;
          for (var key in this.config) {
            var vo = new ShopClassVo_1.ShopClassVo();
            vo.decode(this.config[key], ConfigManager_1.ConfigManager.instance.clientConfig.config.shop.type[key]);
            var renderer = cc.instantiate(this.classPrefab);
            renderer.getComponent("ShopClassRenderer").fillData(vo);
            this.contentNode.addChild(renderer);
            this.list.push(renderer);
          }
        }
        EventDispatcher_1.EventDispatcher.on(GameEvent_1.GameEvent.BUY_SUCCESS, this.onUpdate, this);
      };
      ShopWin.prototype.onDisable = function() {};
      ShopWin.prototype.onUpdate = function() {
        this.list.forEach(function(element) {
          element.getComponent("ShopClassRenderer").onUpdate();
        });
      };
      __decorate([ property(cc.Node) ], ShopWin.prototype, "contentNode", void 0);
      __decorate([ property(cc.Prefab) ], ShopWin.prototype, "classPrefab", void 0);
      ShopWin = __decorate([ ccclass ], ShopWin);
      return ShopWin;
    }(cc.Component);
    exports.default = ShopWin;
    cc._RF.pop();
  }, {
    "../../data/ConfigManager": "ConfigManager",
    "../../data/vo/ShopClassVo": "ShopClassVo",
    "../../event/EventDispatcher": "EventDispatcher",
    "../../event/GameEvent": "GameEvent"
  } ],
  SkillVo: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7815eTeT9BFfaONWJixLKrG", "SkillVo");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var SkillVo = function() {
      function SkillVo() {}
      SkillVo.prototype.decode = function(data) {
        this.id = data.skillId;
        this.costType = data.costType;
        this.cost = data.costPara;
        this.para = data.para;
        this.name = data.skillName;
        this.dailyFirstCostPara = data.dailyFirstCostPara;
        this.dailyFirstCostType = data.dailyFirstCostType;
      };
      return SkillVo;
    }();
    exports.SkillVo = SkillVo;
    cc._RF.pop();
  }, {} ],
  StrUtils: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "4ffd8yS7P9LLYbamuxAqPEj", "StrUtils");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var StrUtils = function() {
      function StrUtils() {}
      StrUtils.reqlace = function(str, tar) {
        return str.replace(/#/g, tar);
      };
      return StrUtils;
    }();
    exports.StrUtils = StrUtils;
    cc._RF.pop();
  }, {} ],
  TimeUtils: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2f3cbhlB/5Fppp0VGXVTgDt", "TimeUtils");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var TimeUtils = function() {
      function TimeUtils() {}
      TimeUtils.getLocalTime = function(ns) {
        return new Date(1e3 * ns).toLocaleString().replace(/:\d{1,2}$/, " ");
      };
      TimeUtils.time2Cooldown = function(mss) {
        var hours = Math.floor(mss % 864e5 / 36e5);
        var minutes = Math.floor(mss % 36e5 / 6e4);
        var seconds = Math.floor(mss % 6e4 / 1e3);
        if (hours > 0) return hours + ":" + minutes + ":" + seconds;
        return minutes + ":" + seconds;
      };
      return TimeUtils;
    }();
    exports.TimeUtils = TimeUtils;
    cc._RF.pop();
  }, {} ],
  TopView: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9ec36zLiEROUIuhyBQdQmgV", "TopView");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var EventDispatcher_1 = require("../../event/EventDispatcher");
    var GameEvent_1 = require("../../event/GameEvent");
    var UserManager_1 = require("../../data/UserManager");
    var NumUtils_1 = require("../../utils/NumUtils");
    var WindowConfig_1 = require("../../data/config/WindowConfig");
    var ConfigManager_1 = require("../../data/ConfigManager");
    var WindowManager_1 = require("../manager/WindowManager");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var TopView = function(_super) {
      __extends(TopView, _super);
      function TopView() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.levellabel = null;
        _this.expLabel = null;
        _this.coinLabel = null;
        _this.jewelLabel = null;
        _this.expPb = null;
        return _this;
      }
      TopView.prototype.onLoad = function() {
        EventDispatcher_1.EventDispatcher.on(GameEvent_1.GameEvent.USER_INFO_UPDATE, this.updateInfo, this);
        EventDispatcher_1.EventDispatcher.on(GameEvent_1.GameEvent.USER_COIN_UPDATE, this.updateCoin, this);
        EventDispatcher_1.EventDispatcher.on(GameEvent_1.GameEvent.BLOCK_INFO_UPDATE, this.updateZombieLevel, this);
      };
      TopView.prototype.start = function() {};
      TopView.prototype.updateInfo = function() {
        var vo = UserManager_1.UserManager.instance.user;
        if (vo) {
          this.levellabel.string = String(vo.resetTimes);
          this.expLabel.string = vo.totalLevel.toString();
          this.updateCoin();
          this.expPb.progress = vo.totalLevel / ConfigManager_1.ConfigManager.instance.clientConfig.config.resetLevel;
        }
      };
      TopView.prototype.updateCoin = function() {
        var vo = UserManager_1.UserManager.instance.user;
        if (vo) {
          vo.coin && (this.coinLabel.string = NumUtils_1.NumUtils.num2Coin(vo.coin));
          parseInt(vo.jewel) > -1 && (this.jewelLabel.string = NumUtils_1.NumUtils.num2Coin(vo.jewel));
        }
      };
      TopView.prototype.onArmyUp = function() {
        WindowManager_1.default.instance.open(WindowConfig_1.WindowConfig.ARMYUP);
      };
      TopView.prototype.onAddCoin = function() {};
      TopView.prototype.onAddJewel = function() {};
      TopView.prototype.updateZombieLevel = function() {
        UserManager_1.UserManager.instance.updateTotalLevel();
        this.updateInfo();
      };
      __decorate([ property(cc.Label) ], TopView.prototype, "levellabel", void 0);
      __decorate([ property(cc.Label) ], TopView.prototype, "expLabel", void 0);
      __decorate([ property(cc.Label) ], TopView.prototype, "coinLabel", void 0);
      __decorate([ property(cc.Label) ], TopView.prototype, "jewelLabel", void 0);
      __decorate([ property(cc.ProgressBar) ], TopView.prototype, "expPb", void 0);
      TopView = __decorate([ ccclass ], TopView);
      return TopView;
    }(cc.Component);
    exports.default = TopView;
    cc._RF.pop();
  }, {
    "../../data/ConfigManager": "ConfigManager",
    "../../data/UserManager": "UserManager",
    "../../data/config/WindowConfig": "WindowConfig",
    "../../event/EventDispatcher": "EventDispatcher",
    "../../event/GameEvent": "GameEvent",
    "../../utils/NumUtils": "NumUtils",
    "../manager/WindowManager": "WindowManager"
  } ],
  UrlConfig: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b3de8QSO5VNAZvkViH3pOfu", "UrlConfig");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var UrlConfig = function() {
      function UrlConfig() {}
      UrlConfig.URL = "http://13.115.178.3:8080/";
      UrlConfig.HARVEST = UrlConfig.URL + "harvest";
      UrlConfig.UNLOCK = UrlConfig.URL + "unlockzombie";
      UrlConfig.UPLEVEL = UrlConfig.URL + "uplevel";
      UrlConfig.LOGIN = UrlConfig.URL + "ttlogin";
      UrlConfig.CONFIG = UrlConfig.URL + "getconfig";
      UrlConfig.USERINFO = UrlConfig.URL + "getplayer";
      UrlConfig.GET_CARD = UrlConfig.URL + "takedaily";
      UrlConfig.SHOP_INFO = UrlConfig.URL + "shopInfo";
      UrlConfig.USER_ADDEXP = UrlConfig.URL + "addexp";
      UrlConfig.USER_GROWUP = UrlConfig.URL + "zombiegrow";
      UrlConfig.USER_HAVEST = UrlConfig.URL + "collectearnings";
      UrlConfig.USER_LEVELUP = UrlConfig.URL + "rebirth";
      UrlConfig.ACTIVE_BUFF = UrlConfig.URL + "activatebuff";
      UrlConfig.TICK = UrlConfig.URL + "tick";
      UrlConfig.BREAKOUT = UrlConfig.URL + "zombiebreakout";
      UrlConfig.DOUBLEOFFEARNINGS = UrlConfig.URL + "doubleoffearnings";
      UrlConfig.BUY = UrlConfig.URL + "shopping";
      return UrlConfig;
    }();
    exports.UrlConfig = UrlConfig;
    cc._RF.pop();
  }, {} ],
  UserManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "76621D3UBpKZoLntx83dRm/", "UserManager");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var UserVo_1 = require("./vo/UserVo");
    var NumUtils_1 = require("../utils/NumUtils");
    var ClientManager_1 = require("./ClientManager");
    var ConfigManager_1 = require("./ConfigManager");
    var HttpManager_1 = require("../net/HttpManager");
    var BufferVo_1 = require("./vo/BufferVo");
    var OtherConfig_1 = require("./config/OtherConfig");
    var UserManager = function() {
      function UserManager() {}
      Object.defineProperty(UserManager, "instance", {
        get: function() {
          null == UserManager._instance && (UserManager._instance = new UserManager());
          return UserManager._instance;
        },
        enumerable: true,
        configurable: true
      });
      UserManager.prototype.init = function() {};
      UserManager.prototype.updateUser = function(data) {
        this.fillUser(this.user, data);
      };
      UserManager.prototype.fillUser = function(user, data) {
        user.openid = data.openid;
        user.id = data.id;
        user.coin = NumUtils_1.NumUtils.getBigNum(OtherConfig_1.PropertyKey.COIN);
        user.name = data.username;
        user.jewel = data.diamond;
        user.resetTimes = data.rebirth;
        user.resetReward = data.rebirthEffective;
        user.vip = data.vip;
        user.dailyBomb = data.dailyBomb;
        data.dailyCard < 0 ? user.isGetDailyCard = false : user.isGetDailyCard = new Date().toDateString() === new Date(data.dailyCard).toDateString();
        this.updateBuffer(data);
        data["resetCoolDown"] > 0 && (user.resetcooldown = data["rebirthDate"] - ClientManager_1.ClientManager.instance.serverTime);
        for (var i = 1; i < 10; i++) {
          user.cardMap[i] = data[OtherConfig_1.PropertyKey.ZOMBIE_CARD + i];
          var auto = 0 != data[OtherConfig_1.PropertyKey.ZOMBIE_AUTO + i];
          var config = ConfigManager_1.ConfigManager.instance.zombieConfig[i];
          var info = {
            id: i,
            level: data[OtherConfig_1.PropertyKey.ZOMBIE_LEVEL + i],
            auto: auto,
            breakout: data[OtherConfig_1.PropertyKey.ZOMBIE_BREAKOUT + i],
            reward: NumUtils_1.NumUtils.getBigNum(OtherConfig_1.PropertyKey.ZOMBIE_EARNINGS + i),
            grow: data[OtherConfig_1.PropertyKey.ZOMBIE_PROCESS + i]
          };
          ClientManager_1.ClientManager.instance.blockHistory[i] = NumUtils_1.NumUtils.getBigNum(OtherConfig_1.PropertyKey.ZOMBIE_EARNINGS + i);
          user.addZmobie(i, config, info, ConfigManager_1.ConfigManager.instance.cardConfig[i]);
        }
        this.updateTotalLevel();
      };
      UserManager.prototype.creatorUser = function(data) {
        this.user = new UserVo_1.UserVo();
        this.fillUser(this.user, data);
      };
      UserManager.prototype.updateTotalLevel = function() {
        this.user.totalLevel = 0;
        for (var key in this.user.zmobieMap) {
          var zvo = this.user.zmobieMap[key];
          this.user.totalLevel += zvo.level;
        }
      };
      UserManager.prototype.updateBuffer = function(data) {
        var _this = this;
        ConfigManager_1.ConfigManager.instance.clientConfig.config.buffer.forEach(function(element) {
          var bvo = new BufferVo_1.BufferVo();
          bvo.decode(element);
          if (data[element.name] > 0) {
            bvo.endTime = data[element.name];
            bvo.time = data[element.name] - ClientManager_1.ClientManager.instance.serverTime;
          }
          bvo.decodeSkill(ConfigManager_1.ConfigManager.instance.skillConfig[element.id]);
          _this.user.bufferMap[bvo.id] = bvo;
        });
      };
      UserManager.prototype.updateZombieValue = function() {
        for (var key in this.user.zmobieMap) this.user.zmobieMap[key].levelUp();
      };
      UserManager.prototype.checkDaliyCard = function() {
        false == this.user.isGetDailyCard && this.user.zmobieMap[6].level > 0 && HttpManager_1.HttpManager.instance.reqHelper.dalyiCard();
      };
      return UserManager;
    }();
    exports.UserManager = UserManager;
    cc._RF.pop();
  }, {
    "../net/HttpManager": "HttpManager",
    "../utils/NumUtils": "NumUtils",
    "./ClientManager": "ClientManager",
    "./ConfigManager": "ConfigManager",
    "./config/OtherConfig": "OtherConfig",
    "./vo/BufferVo": "BufferVo",
    "./vo/UserVo": "UserVo"
  } ],
  UserVo: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b0475baLBRN0rAgzojr7ODA", "UserVo");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var EventDispatcher_1 = require("../../event/EventDispatcher");
    var GameEvent_1 = require("../../event/GameEvent");
    var ZombieVo_1 = require("./ZombieVo");
    var OtherConfig_1 = require("../config/OtherConfig");
    var ConfigManager_1 = require("../ConfigManager");
    var UserVo = function() {
      function UserVo() {
        this.resetTimes = 0;
        this.totalLevel = 0;
        this.resetcooldown = 0;
        this.resetReward = 0;
        this.vip = 0;
        this.isGetDailyCard = false;
        this.dailyBomb = 0;
        this.cardMap = {};
        this.zmobieMap = {};
        this.bufferMap = {};
      }
      Object.defineProperty(UserVo.prototype, "coin", {
        get: function() {
          return this._coin;
        },
        set: function(value) {
          this._coin = value;
          EventDispatcher_1.EventDispatcher.trigger(GameEvent_1.GameEvent.USER_COIN_UPDATE);
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(UserVo.prototype, "jewel", {
        get: function() {
          return this._jewel;
        },
        set: function(value) {
          this._jewel = value;
          EventDispatcher_1.EventDispatcher.trigger(GameEvent_1.GameEvent.USER_COIN_UPDATE);
        },
        enumerable: true,
        configurable: true
      });
      UserVo.prototype.addCurrency = function(value, type) {
        void 0 === type && (type = OtherConfig_1.CurrencyType.COIN);
        switch (type.toString()) {
         case OtherConfig_1.CurrencyType.COIN.toString():
          this.coin = new Big(value).plus(this._coin).toFixed(0);
          break;

         case OtherConfig_1.CurrencyType.JEWEL.toString():
          this.jewel = new Big(value).minus(this._jewel).toFixed(0);
        }
      };
      UserVo.prototype.subCurrency = function(value, type) {
        void 0 === type && (type = OtherConfig_1.CurrencyType.COIN);
        switch (type.toString()) {
         case OtherConfig_1.CurrencyType.COIN.toString():
          this.coin = new Big(this._coin).minus(value).toFixed(0);
          break;

         case OtherConfig_1.CurrencyType.JEWEL.toString():
          this.jewel = new Big(this._jewel).minus(value).toFixed(0);
        }
      };
      UserVo.prototype.isEnough = function(num, currencyType) {
        void 0 === currencyType && (currencyType = OtherConfig_1.CurrencyType.COIN);
        switch (currencyType) {
         case OtherConfig_1.CurrencyType.COIN:
          return new Big(this.coin).gte(num);

         case OtherConfig_1.CurrencyType.JEWEL:
          return new Big(this._jewel).gte(num);

         case OtherConfig_1.CurrencyType.RMB:
          return true;
        }
      };
      UserVo.prototype.addZmobie = function(id, config, info, card) {
        var zvo = new ZombieVo_1.ZombieVo();
        zvo.decode(id, config, info, card);
        this.zmobieMap[zvo.id] = zvo;
      };
      UserVo.prototype.getBuffer = function(name) {
        for (var key in this.bufferMap) if (this.bufferMap[key].name == name) return this.bufferMap[key];
      };
      Object.defineProperty(UserVo.prototype, "vipEffect", {
        get: function() {
          if (this.vip < 1) return 0;
          var vvo = ConfigManager_1.ConfigManager.instance.shopMap[OtherConfig_1.VipKey.VIP_ID_MAP[this.vip]];
          return parseInt(vvo.para);
        },
        enumerable: true,
        configurable: true
      });
      return UserVo;
    }();
    exports.UserVo = UserVo;
    cc._RF.pop();
  }, {
    "../../event/EventDispatcher": "EventDispatcher",
    "../../event/GameEvent": "GameEvent",
    "../ConfigManager": "ConfigManager",
    "../config/OtherConfig": "OtherConfig",
    "./ZombieVo": "ZombieVo"
  } ],
  WalfareWin: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e33afaNsF1JOLe5fwk4wzR/", "WalfareWin");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var CardVo_1 = require("../../data/vo/CardVo");
    var ConfigManager_1 = require("../../data/ConfigManager");
    var WindowManager_1 = require("../manager/WindowManager");
    var AssetsConfig_1 = require("../../data/config/AssetsConfig");
    var ShopItemVo_1 = require("../../data/vo/ShopItemVo");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var WalfareWin = function(_super) {
      __extends(WalfareWin, _super);
      function WalfareWin() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.item = null;
        _this.content = null;
        return _this;
      }
      WalfareWin.prototype.onLoad = function() {};
      WalfareWin.prototype.onEnable = function() {
        this.init();
      };
      WalfareWin.prototype.onDisable = function() {
        this.content.removeAllChildren();
      };
      WalfareWin.prototype.init = function() {
        var _this = this;
        var data = this.node.data.params;
        if (this.node) if (data.length) data.forEach(function(element) {
          var cvo = ConfigManager_1.ConfigManager.instance.cardConfig[element];
          _this.createItem(cvo);
        }); else {
          console.log(data);
          this.createItem(data);
        }
      };
      WalfareWin.prototype.createItem = function(data) {
        var item = cc.instantiate(this.item);
        var script = item.getComponent("RewardRenderer");
        var root = "";
        data instanceof CardVo_1.CardVo ? root = AssetsConfig_1.AssetsConfig.ZOMBIE : data instanceof ShopItemVo_1.ShopItemVo ? root = AssetsConfig_1.AssetsConfig.SHOP : console.error("rewardRenderer can not find url:", data);
        script.fillData(data, 1, root);
        this.content.addChild(item);
      };
      WalfareWin.prototype.onClick = function() {
        WindowManager_1.default.instance.close();
      };
      __decorate([ property(cc.Prefab) ], WalfareWin.prototype, "item", void 0);
      __decorate([ property(cc.Node) ], WalfareWin.prototype, "content", void 0);
      WalfareWin = __decorate([ ccclass ], WalfareWin);
      return WalfareWin;
    }(cc.Component);
    exports.default = WalfareWin;
    cc._RF.pop();
  }, {
    "../../data/ConfigManager": "ConfigManager",
    "../../data/config/AssetsConfig": "AssetsConfig",
    "../../data/vo/CardVo": "CardVo",
    "../../data/vo/ShopItemVo": "ShopItemVo",
    "../manager/WindowManager": "WindowManager"
  } ],
  WelcomeWin: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2bab3XJOexDBJ6dwhvEElUu", "WelcomeWin");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var ClientManager_1 = require("../data/ClientManager");
    var NumUtils_1 = require("../utils/NumUtils");
    var PlatformManager_1 = require("../platform/PlatformManager");
    var UserManager_1 = require("../data/UserManager");
    var HttpManager_1 = require("../net/HttpManager");
    var LocalizationManager_1 = require("../data/LocalizationManager");
    var WindowManager_1 = require("./manager/WindowManager");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var WelcomeWin = function(_super) {
      __extends(WelcomeWin, _super);
      function WelcomeWin() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.rewardLabel = null;
        _this.btnLabel = null;
        _this.goldSprite = null;
        _this.adPlayCompletje = false;
        return _this;
      }
      WelcomeWin.prototype.onLoad = function() {
        this.rewardLabel.string = NumUtils_1.NumUtils.num2Coin(ClientManager_1.ClientManager.instance.totalOfflineReward);
        this.btnLabel.string = LocalizationManager_1.LocalizationManager.localText("\u53cc\u500d\u9886\u53d6");
      };
      WelcomeWin.prototype.start = function() {};
      WelcomeWin.prototype.onClick = function() {
        var _this = this;
        this.adPlayCompletje ? HttpManager_1.HttpManager.instance.reqHelper.getDoubleOfflineReward().then(function() {
          WindowManager_1.default.instance.close();
        }) : PlatformManager_1.PlatformManager.instance.current.playAd(function() {
          _this.adPlayCompletje = true;
          _this.adComplete();
        });
      };
      WelcomeWin.prototype.adComplete = function() {
        this.rewardLabel.string = NumUtils_1.NumUtils.num2Coin(new Big(ClientManager_1.ClientManager.instance.totalOfflineReward).mul(2).toString());
        this.btnLabel.string = LocalizationManager_1.LocalizationManager.localText("\u9886\u53d6");
      };
      WelcomeWin.prototype.onDisable = function() {
        UserManager_1.UserManager.instance.checkDaliyCard();
      };
      __decorate([ property(cc.Label) ], WelcomeWin.prototype, "rewardLabel", void 0);
      __decorate([ property(cc.Label) ], WelcomeWin.prototype, "btnLabel", void 0);
      __decorate([ property(cc.Sprite) ], WelcomeWin.prototype, "goldSprite", void 0);
      WelcomeWin = __decorate([ ccclass ], WelcomeWin);
      return WelcomeWin;
    }(cc.Component);
    exports.default = WelcomeWin;
    cc._RF.pop();
  }, {
    "../data/ClientManager": "ClientManager",
    "../data/LocalizationManager": "LocalizationManager",
    "../data/UserManager": "UserManager",
    "../net/HttpManager": "HttpManager",
    "../platform/PlatformManager": "PlatformManager",
    "../utils/NumUtils": "NumUtils",
    "./manager/WindowManager": "WindowManager"
  } ],
  Welfare: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "dacafsUzhNCaKRt3xfN3Tlq", "Welfare");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var HttpManager_1 = require("../../Script/net/HttpManager");
    var GoldManager_1 = require("../../Script/data/GoldManager");
    var ConfigManager_1 = require("../../Script/data/ConfigManager");
    var UserManager_1 = require("../../Script/data/UserManager");
    var EventDispatcher_1 = require("../../Script/event/EventDispatcher");
    var GameEvent_1 = require("../../Script/event/GameEvent");
    var ClientManager_1 = require("../../Script/data/ClientManager");
    var WindowManager_1 = require("../../Script/window/manager/WindowManager");
    var WindowConfig_1 = require("../../Script/data/config/WindowConfig");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Welfare = function(_super) {
      __extends(Welfare, _super);
      function Welfare() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.bombZombie = null;
        _this.musicZombie = null;
        _this.content = null;
        return _this;
      }
      Welfare.prototype.onLoad = function() {
        EventDispatcher_1.EventDispatcher.on(GameEvent_1.GameEvent.USER_INFO_COMPLETE, this.randomWelfare, this);
      };
      Welfare.prototype.randomWelfare = function() {
        var minInterval = 36e5;
        var time = ClientManager_1.ClientManager.instance.serverTime - UserManager_1.UserManager.instance.user.dailyBomb;
        time = time > minInterval ? 0 : minInterval - time;
        time += Math.floor(1e4 * Math.random());
        console.log("next bomb zombie time", time);
        try {
          setTimeout(this.show.bind(this), time);
        } catch (e) {
          console.error(e);
        }
      };
      Welfare.prototype.show = function() {
        this.currentZombie = cc.instantiate(this.bombZombie);
        var pointList = ConfigManager_1.ConfigManager.instance.clientConfig.config.welfarePoints;
        var point = pointList[Math.floor(Math.random() * pointList.length)];
        this.currentZombie.x = point.x;
        this.currentZombie.y = point.y;
        this.content.addChild(this.currentZombie);
        this.currentZombie.on(cc.Node.EventType.TOUCH_END, this.onClick, this);
      };
      Welfare.prototype.onClick = function(evt) {
        var _this = this;
        var anim = this.currentZombie.getComponent(cc.Animation);
        anim.play("bombState2", 0);
        HttpManager_1.HttpManager.instance.reqHelper.walfare().then(function(data) {
          UserManager_1.UserManager.instance.user.dailyBomb = ClientManager_1.ClientManager.instance.serverTime;
          _this.randomWelfare();
          if (data.coin) _this.clickResult(data.coin); else if (data.cards) {
            var coin_1 = 0;
            data.cards.forEach(function(element) {
              UserManager_1.UserManager.instance.user.cardMap[element] += 1;
            });
            setTimeout(function() {
              WindowManager_1.default.instance.open(WindowConfig_1.WindowConfig.WALFARE, {
                params: data.cards
              });
              _this.clickResult(coin_1);
            }, 1e3);
          }
        });
      };
      Welfare.prototype.clickResult = function(num) {
        var _this = this;
        setTimeout(function() {
          var p1 = _this.currentZombie.parent.convertToWorldSpaceAR(_this.currentZombie.position);
          GoldManager_1.GoldManager.instance.fly2Info(_this.currentZombie.position);
        }, 1e3);
      };
      __decorate([ property(cc.Prefab) ], Welfare.prototype, "bombZombie", void 0);
      __decorate([ property(cc.Prefab) ], Welfare.prototype, "musicZombie", void 0);
      __decorate([ property(cc.Node) ], Welfare.prototype, "content", void 0);
      Welfare = __decorate([ ccclass ], Welfare);
      return Welfare;
    }(cc.Component);
    exports.default = Welfare;
    cc._RF.pop();
  }, {
    "../../Script/data/ClientManager": "ClientManager",
    "../../Script/data/ConfigManager": "ConfigManager",
    "../../Script/data/GoldManager": "GoldManager",
    "../../Script/data/UserManager": "UserManager",
    "../../Script/data/config/WindowConfig": "WindowConfig",
    "../../Script/event/EventDispatcher": "EventDispatcher",
    "../../Script/event/GameEvent": "GameEvent",
    "../../Script/net/HttpManager": "HttpManager",
    "../../Script/window/manager/WindowManager": "WindowManager"
  } ],
  WindowConfig: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ed374+WRZZDpJuBaNDmgKzr", "WindowConfig");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var WindowConfig = function() {
      function WindowConfig() {}
      WindowConfig.ALERT = "alert";
      WindowConfig.ARMYUP = "armyUpWin";
      WindowConfig.CARD = "cardWin";
      WindowConfig.RANK = "rankWin";
      WindowConfig.SHOP = "shopWin";
      WindowConfig.WALFARE = "walfareWin";
      WindowConfig.WELCOME = "welcomeWin";
      WindowConfig.DOUBLEEFFICIENCY = "doubleSpeedWin";
      WindowConfig.DOUBLEREVENUE = "doubleRewardWin";
      return WindowConfig;
    }();
    exports.WindowConfig = WindowConfig;
    exports.windowPrefabPathList = [ WindowConfig.ALERT, WindowConfig.ARMYUP, WindowConfig.CARD, WindowConfig.RANK, WindowConfig.SHOP, WindowConfig.WALFARE, WindowConfig.WELCOME, WindowConfig.DOUBLEEFFICIENCY, WindowConfig.DOUBLEREVENUE ];
    cc._RF.pop();
  }, {} ],
  WindowManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "31432dj6K9KG6dmSpe1lCzR", "WindowManager");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var WindowStateMachine_1 = require("./WindowStateMachine");
    var WindowStates_1 = require("./WindowStates");
    var WindowConfig_1 = require("../../data/config/WindowConfig");
    var WindowManager = function() {
      function WindowManager() {
        this.prefabList = {};
        this.winList = {};
        this.openList = [];
      }
      Object.defineProperty(WindowManager, "instance", {
        get: function() {
          null == WindowManager._instance && (WindowManager._instance = new WindowManager());
          return WindowManager._instance;
        },
        enumerable: true,
        configurable: true
      });
      WindowManager.prototype.init = function() {
        this.staticMachine = new WindowStateMachine_1.WindowStateMachine(this);
        this.staticMachine.changeState(WindowStates_1.WindowInitState);
      };
      WindowManager.prototype.open = function(window, data) {
        this.staticMachine.cutState.open(window, data);
      };
      WindowManager.prototype.close = function() {
        this.staticMachine.cutState.close();
      };
      WindowManager.prototype.alert = function(content, title, callback) {
        this.staticMachine.cutState.open(WindowConfig_1.WindowConfig.ALERT, {
          content: content,
          title: title,
          callback: callback
        });
      };
      return WindowManager;
    }();
    exports.default = WindowManager;
    cc._RF.pop();
  }, {
    "../../data/config/WindowConfig": "WindowConfig",
    "./WindowStateMachine": "WindowStateMachine",
    "./WindowStates": "WindowStates"
  } ],
  WindowStateMachine: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d4389XBUt1CIpIEsHPFfK/t", "WindowStateMachine");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var BaseStateMachine_1 = require("../../frame/state/base/BaseStateMachine");
    var WindowStateMachine = function(_super) {
      __extends(WindowStateMachine, _super);
      function WindowStateMachine(owner) {
        return _super.call(this, owner) || this;
      }
      return WindowStateMachine;
    }(BaseStateMachine_1.BaseStateMachine);
    exports.WindowStateMachine = WindowStateMachine;
    cc._RF.pop();
  }, {
    "../../frame/state/base/BaseStateMachine": "BaseStateMachine"
  } ],
  WindowStates: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0afcf3VqHtGkaK7vNeGWveH", "WindowStates");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var AssetsManager_1 = require("../../data/AssetsManager");
    var AssetsConfig_1 = require("../../data/config/AssetsConfig");
    var EventDispatcher_1 = require("../../event/EventDispatcher");
    var GameEvent_1 = require("../../event/GameEvent");
    var WindowConfig_1 = require("../../data/config/WindowConfig");
    var WindowInitState = function() {
      function WindowInitState() {}
      WindowInitState.prototype.onEnter = function(data) {
        this.owner = data;
        this.prefabPathList = WindowConfig_1.windowPrefabPathList;
        this.loadPrefab();
      };
      WindowInitState.prototype.onExit = function(data) {};
      WindowInitState.prototype.loadPrefab = function() {
        return __awaiter(this, void 0, Promise, function() {
          var name, _a, _b;
          return __generator(this, function(_c) {
            switch (_c.label) {
             case 0:
              if (!(this.prefabPathList.length > 0)) return [ 3, 2 ];
              name = this.prefabPathList.pop();
              _a = this.owner.prefabList;
              _b = name;
              return [ 4, AssetsManager_1.AssetsManager.instance.loadRes(AssetsConfig_1.AssetsConfig.WINDOW + name) ];

             case 1:
              _a[_b] = _c.sent();
              this.loadPrefab();
              return [ 3, 3 ];

             case 2:
              EventDispatcher_1.EventDispatcher.trigger(GameEvent_1.GameEvent.WIN_INIT_COMPLETE);
              this.owner.staticMachine.changeState(WindowReadyState);
              _c.label = 3;

             case 3:
              return [ 2 ];
            }
          });
        });
      };
      WindowInitState.prototype.close = function() {
        this.owner.waitWin = null;
      };
      WindowInitState.prototype.open = function(name, data) {
        this.owner.waitWin = {
          win: name,
          data: data
        };
      };
      return WindowInitState;
    }();
    exports.WindowInitState = WindowInitState;
    var WindowReadyState = function() {
      function WindowReadyState() {}
      WindowReadyState.prototype.onEnter = function(data) {
        this.owner = data;
        if (this.owner.waitWin) {
          this.open(this.owner.waitWin.win, this.owner.waitWin.data);
          this.owner.waitWin = null;
        }
      };
      WindowReadyState.prototype.onExit = function(data) {};
      WindowReadyState.prototype.close = function() {
        if (this.owner.currentWin) {
          this.owner.currentWin.node.parent.removeChild(this.owner.currentWin.node);
          this.owner.currentWin.node.active = false;
          this.owner.openList.pop();
          this.owner.currentWin = null;
        }
        this.owner.openList.length > 0 && (this.owner.currentWin = this.owner.openList[this.owner.openList.length - 1]);
      };
      WindowReadyState.prototype.open = function(name, data) {
        if (!this.owner.currentWin || this.owner.currentWin.name != name) {
          var node = void 0;
          if (this.owner.winList[name]) node = this.owner.winList[name]; else {
            var pf = this.owner.prefabList[name];
            node = cc.instantiate(pf);
            this.owner.winList[name] = node;
          }
          if (!node) throw new Error("node is null");
          node.active = true;
          node.params = data;
          node.data = data;
          this.owner.currentWin = {
            name: name,
            node: node
          };
          cc.director.getScene().addChild(node);
          this.owner.openList.push({
            name: name,
            node: node
          });
        }
      };
      return WindowReadyState;
    }();
    exports.WindowReadyState = WindowReadyState;
    cc._RF.pop();
  }, {
    "../../data/AssetsManager": "AssetsManager",
    "../../data/config/AssetsConfig": "AssetsConfig",
    "../../data/config/WindowConfig": "WindowConfig",
    "../../event/EventDispatcher": "EventDispatcher",
    "../../event/GameEvent": "GameEvent"
  } ],
  WindowTop: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7c894pVJvRErKhrXb7GiWWo", "WindowTop");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var EventDispatcher_1 = require("../event/EventDispatcher");
    var GameEvent_1 = require("../event/GameEvent");
    var UserManager_1 = require("../data/UserManager");
    var NumUtils_1 = require("../utils/NumUtils");
    var WindowManager_1 = require("./manager/WindowManager");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var WindowTop = function(_super) {
      __extends(WindowTop, _super);
      function WindowTop() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.coinLabel = null;
        _this.jewelLabel = null;
        return _this;
      }
      WindowTop.prototype.onLoad = function() {
        EventDispatcher_1.EventDispatcher.on(GameEvent_1.GameEvent.USER_INFO_UPDATE, this.updateInfo, this);
        this.updateInfo();
      };
      WindowTop.prototype.start = function() {};
      WindowTop.prototype.onBack = function() {
        WindowManager_1.default.instance.close();
      };
      WindowTop.prototype.addCoin = function() {};
      WindowTop.prototype.addJewel = function() {};
      WindowTop.prototype.updateInfo = function() {
        var vo = UserManager_1.UserManager.instance.user;
        this.coinLabel.string = NumUtils_1.NumUtils.num2Coin(vo.coin);
        this.jewelLabel.string = NumUtils_1.NumUtils.num2Coin(vo.jewel);
      };
      __decorate([ property(cc.Label) ], WindowTop.prototype, "coinLabel", void 0);
      __decorate([ property(cc.Label) ], WindowTop.prototype, "jewelLabel", void 0);
      WindowTop = __decorate([ ccclass ], WindowTop);
      return WindowTop;
    }(cc.Component);
    exports.default = WindowTop;
    cc._RF.pop();
  }, {
    "../data/UserManager": "UserManager",
    "../event/EventDispatcher": "EventDispatcher",
    "../event/GameEvent": "GameEvent",
    "../utils/NumUtils": "NumUtils",
    "./manager/WindowManager": "WindowManager"
  } ],
  WxPlatform: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c1e5eDA7rFPopdH1wRCrdF6", "WxPlatform");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var WxPlatform = function() {
      function WxPlatform() {}
      WxPlatform.prototype.init = function(data) {};
      WxPlatform.prototype.onLoginSuccess = function() {};
      WxPlatform.prototype.getUserInfo = function() {};
      WxPlatform.prototype.playAd = function(callback) {};
      WxPlatform.prototype.getLeaderboard = function(callback) {};
      WxPlatform.prototype.onPause = function(callback) {};
      WxPlatform.prototype.share = function(callback) {};
      WxPlatform.prototype.updateRank = function(data) {};
      return WxPlatform;
    }();
    exports.WxPlatform = WxPlatform;
    cc._RF.pop();
  }, {} ],
  ZombieConfigVo: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6df9eNElRhIrrwJxHxdwGls", "ZombieConfigVo");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var ZombieConfigVo = function() {
      function ZombieConfigVo() {}
      ZombieConfigVo.prototype.decodeZombie = function(data) {
        this.id = data.petId;
        this.para = data.para;
        this.maturTime = data.intTime;
        this.maxLevel = data.maxLevel;
        this.name = data.petName;
        this.intProduction = data.intProduction;
        this.rebornPara = data.rebornPara;
      };
      ZombieConfigVo.prototype.decodeUpgrade = function(data) {
        if (data) {
          this.unlockPara = data.unlockPara;
          this.unlockType = data.unlockType;
          this.levelUpCost = data.levelUpPara1;
          this.levelUpRate = data.levelUpPara2;
          this.stageUpCost = data.classUpPara1;
          this.stageUpRate = data.classUpPara2;
        }
      };
      ZombieConfigVo.prototype.decodeClientConfig = function(data) {
        data && (this.animationName = data.animi);
      };
      return ZombieConfigVo;
    }();
    exports.ZombieConfigVo = ZombieConfigVo;
    cc._RF.pop();
  }, {} ],
  ZombieVo: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b9efcTbxJ5Ds75SFC/J/B4y", "ZombieVo");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var BufferConfig_1 = require("../config/BufferConfig");
    var UserManager_1 = require("../UserManager");
    var ConfigManager_1 = require("../ConfigManager");
    var ZombieVo = function() {
      function ZombieVo() {
        this.auto = false;
        this.grow = 0;
      }
      ZombieVo.prototype.decode = function(id, config, info, card) {
        this.id = id;
        this.config = config;
        this.card = card;
        this.level = info.level;
        this.auto = info.auto;
        this.breakout = info.breakout;
        this.reward = info.reward;
        this.grow = info.grow;
        this.levelUp();
        this.breakoutUp();
      };
      ZombieVo.prototype.levelUp = function() {
        var user = UserManager_1.UserManager.instance.user;
        var bufValue = user.getBuffer(BufferConfig_1.BufferConfig.DOUBLE_EFFICIENCY).bufferEffect;
        this.updateInterval = this.config.maturTime / Math.pow(2, this.breakout) * (100 - 100 * bufValue) / 100;
        var a = new Big(this.config.intProduction).mul(Math.pow(this.config.para / 100, (this.level - 1) / 10));
        var b = 0;
        user.cardMap[this.id] > 0 && (b = this.card.reward + this.card.extra10 * Math.floor(user.cardMap[this.id] / 10) + this.card.rewardRate * user.cardMap[this.id]);
        this.cardReward = b;
        this.singleReward = new Big(a).mul(b).div(100).plus(a).toFixed(0);
        this.levelUpCost = new Big(this.config.levelUpCost).mul(Math.pow(this.config.levelUpRate / 100, (this.level - 1) / 10)).toFixed(0);
        this.stageUpCost = new Big(this.config.stageUpCost).mul(Math.pow(this.config.stageUpRate / 100, (this.level - 1) / 10)).toFixed(0);
        var vip = user.vipEffect > 0 ? user.vipEffect - 1 : 0;
        this.profitRatio = (1 + vip + user.getBuffer(BufferConfig_1.BufferConfig.DOUBLE_REVENUE).bufferEffect) * (1 + user.resetReward);
        this.updateInterval < ConfigManager_1.ConfigManager.instance.clientConfig.config.minGrowInterval ? this.singleReward = new Big(this.singleReward).mul(this.profitRatio).mul(125).div(this.updateInterval).toFixed(0) : this.singleReward = new Big(this.singleReward).mul(this.profitRatio).toFixed(0);
        console.log("id", this.id, "this.singleReward", this.singleReward, "this.updateInterval", this.updateInterval);
      };
      ZombieVo.prototype.breakoutUp = function() {
        var preStage = this.breakout - 1;
        this.breakout <= 15 ? this.stageUpMax = 5 + 10 * this.breakout + 10 * Math.pow(this.breakout, 2) : this.stageUpMax = 2405 + 300 * (this.breakout - 15);
        this.stageUpMin = preStage <= 15 ? preStage < 0 ? 0 : 5 + 10 * preStage + 10 * Math.pow(preStage, 2) : 2405 + 300 * (preStage - 15);
      };
      ZombieVo.prototype.addLevel = function(level) {
        void 0 === level && (level = 1);
        this.level += level;
        this.levelUp();
      };
      ZombieVo.prototype.addBreakout = function(level) {
        void 0 === level && (level = 1);
        this.breakout += level;
        this.breakoutUp();
      };
      return ZombieVo;
    }();
    exports.ZombieVo = ZombieVo;
    cc._RF.pop();
  }, {
    "../ConfigManager": "ConfigManager",
    "../UserManager": "UserManager",
    "../config/BufferConfig": "BufferConfig"
  } ]
}, {}, [ "BlockView", "BottomView", "BufferRenderer", "GameScene", "GoldRenderer", "Welfare", "BlockRenderer", "BlockStateMachine", "BlockStates", "IBlockState", "IBlockStateMachine", "LoadingScene", "LoginScene", "AssetsManager", "ClientManager", "ConfigManager", "GoldManager", "LocalizationManager", "UserManager", "AssetsConfig", "BufferConfig", "OtherConfig", "UrlConfig", "WindowConfig", "BufferVo", "CardVo", "RankVo", "ShopClassVo", "ShopItemVo", "SkillVo", "UserVo", "ZombieConfigVo", "ZombieVo", "EventDispatcher", "GameEvent", "IShowGoods", "BaseStateMachine", "IEntity", "IInteractState", "IState", "IStateMachine", "IUpdateState", "HttpHandle", "HttpManager", "HttpProxy", "IHttp", "IMessageHandler", "LocalProxy", "IPlatform", "PlatformManager", "PlatformType", "FbPlatform", "LocalPlatform", "WxPlatform", "Base64", "NumUtils", "StrUtils", "TimeUtils", "ArmyUpWin", "DoubleRewardWin", "DoubleSpeedWin", "WelcomeWin", "WindowTop", "CardRenderer", "CardWin", "Alert", "IWindow", "TopView", "IWindowState", "WindowManager", "WindowStateMachine", "WindowStates", "RankRenderer", "RankWin", "RewardRenderer", "WalfareWin", "ShopClassRenderer", "ShopWin", "ShopRenderer", "ShopRendererStates" ]);