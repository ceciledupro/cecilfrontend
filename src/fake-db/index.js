import Mock from "./mock";

import "./db/ecommerce";
import "./db/notification";

Mock.onAny().passThrough();
