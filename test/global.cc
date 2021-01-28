#include "napi.h"

using namespace Napi;

namespace {

void setValue(const CallbackInfo& info) {
  auto env = info.Env();
  std::string key = info[0].As<String>();
  Object value = info[1].As<Object>();
  Object global = env.Global();
  global.Set(key, value);
}

Object getValue(const CallbackInfo& info) {
  auto env = info.Env();
  std::string key = info[0].As<String>();
  Object global = env.Global();
  return global.Get(key).As<Object>();
}

void deleteValue(const CallbackInfo& info) {
  auto env = info.Env();
  Object global = env.Global();
  napi_delete_property(env, global, info[0], NULL);
}

}

Object InitGlobal(Env env) {
  Object exports = Object::New(env);
  exports["setValue"] = Function::New(env, setValue);
  exports["getValue"] = Function::New(env, getValue);
  exports["deleteValue"] = Function::New(env, deleteValue);
  return exports;
}
