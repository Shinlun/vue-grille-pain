enum GpNotificationType {
  MESSAGE,
  SUCCESS,
  WARNING,
  ERROR,
}

enum GpPosition {
  TOP_LEFT,
  TOP,
  TOP_RIGHT,
  RIGHT,
  BOTTOM_RIGHT,
  BOTTOM,
  BOTTOM_LEFT,
  LEFT,
}

enum GpAnimation {
  POP,
  SLIDE_RIGHT,
  SLIDE_LEFT,
  SLIDE_UP,
  SLIDE_DOWN,
}

enum GpOrder {
  ASC,
  DESC,
}

export { GpNotificationType, GpPosition, GpAnimation, GpOrder };
