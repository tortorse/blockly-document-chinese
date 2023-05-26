## Events namespace

## Classes

| Class                                                                                                                       | Description                                                                                                                                                                                                                 |
| --------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Abstract](https://developers.google.com/blockly/reference/js/blockly.events_namespace.abstract_class.md)                   | Abstract class for an event.                                                                                                                                                                                                |
| [BlockBase](https://developers.google.com/blockly/reference/js/blockly.events_namespace.blockbase_class.md)                 | Abstract class for any event related to blocks.                                                                                                                                                                             |
| [BlockChange](https://developers.google.com/blockly/reference/js/blockly.events_namespace.blockchange_class.md)             | Notifies listeners when some element of a block has changed (e.g. field values, comments, etc).                                                                                                                             |
| [BlockCreate](https://developers.google.com/blockly/reference/js/blockly.events_namespace.blockcreate_class.md)             | Notifies listeners when a block (or connected stack of blocks) is created.                                                                                                                                                  |
| [BlockDelete](https://developers.google.com/blockly/reference/js/blockly.events_namespace.blockdelete_class.md)             | Notifies listeners when a block (or connected stack of blocks) is deleted.                                                                                                                                                  |
| [BlockDrag](https://developers.google.com/blockly/reference/js/blockly.events_namespace.blockdrag_class.md)                 | Notifies listeners when a block is being manually dragged/dropped.                                                                                                                                                          |
| [BlockMove](https://developers.google.com/blockly/reference/js/blockly.events_namespace.blockmove_class.md)                 | Notifies listeners when a block is moved. This could be from one connection to another, or from one location on the workspace to another.                                                                                   |
| [BubbleOpen](https://developers.google.com/blockly/reference/js/blockly.events_namespace.bubbleopen_class.md)               | Class for a bubble open event.                                                                                                                                                                                              |
| [Click](https://developers.google.com/blockly/reference/js/blockly.events_namespace.click_class.md)                         | Notifies listeners that ome blockly element was clicked.                                                                                                                                                                    |
| [CommentBase](https://developers.google.com/blockly/reference/js/blockly.events_namespace.commentbase_class.md)             | Abstract class for a comment event.                                                                                                                                                                                         |
| [CommentChange](https://developers.google.com/blockly/reference/js/blockly.events_namespace.commentchange_class.md)         | Notifies listeners that the contents of a workspace comment has changed.                                                                                                                                                    |
| [CommentCreate](https://developers.google.com/blockly/reference/js/blockly.events_namespace.commentcreate_class.md)         | Notifies listeners that a workspace comment was created.                                                                                                                                                                    |
| [CommentDelete](https://developers.google.com/blockly/reference/js/blockly.events_namespace.commentdelete_class.md)         | Notifies listeners that a workspace comment has been deleted.                                                                                                                                                               |
| [CommentMove](https://developers.google.com/blockly/reference/js/blockly.events_namespace.commentmove_class.md)             | Notifies listeners that a workspace comment has moved.                                                                                                                                                                      |
| [FinishedLoading](https://developers.google.com/blockly/reference/js/blockly.events_namespace.finishedloading_class.md)     | Notifies listeners when the workspace has finished deserializing from JSON/XML.                                                                                                                                             |
| [MarkerMove](https://developers.google.com/blockly/reference/js/blockly.events_namespace.markermove_class.md)               | Notifies listeners that a marker (used for keyboard navigation) has moved.                                                                                                                                                  |
| [Selected](https://developers.google.com/blockly/reference/js/blockly.events_namespace.selected_class.md)                   | Class for a selected event. Notifies listeners that a new element has been selected.                                                                                                                                        |
| [ThemeChange](https://developers.google.com/blockly/reference/js/blockly.events_namespace.themechange_class.md)             | Notifies listeners that the workspace theme has changed.                                                                                                                                                                    |
| [ToolboxItemSelect](https://developers.google.com/blockly/reference/js/blockly.events_namespace.toolboxitemselect_class.md) | Notifies listeners that a toolbox item has been selected.                                                                                                                                                                   |
| [TrashcanOpen](https://developers.google.com/blockly/reference/js/blockly.events_namespace.trashcanopen_class.md)           | Notifies listeners when the trashcan is opening or closing.                                                                                                                                                                 |
| [Ui](https://developers.google.com/blockly/reference/js/blockly.events_namespace.ui_class.md)                               | Class for a UI event.                                                                                                                                                                                                       |
| [UiBase](https://developers.google.com/blockly/reference/js/blockly.events_namespace.uibase_class.md)                       | Base class for a UI event. UI events are events that don't need to be sent over the wire for multi-user editing to work (e.g. scrolling the workspace, zooming, opening toolbox categories). UI events do not undo or redo. |
| [VarBase](https://developers.google.com/blockly/reference/js/blockly.events_namespace.varbase_class.md)                     | Abstract class for a variable event.                                                                                                                                                                                        |
| [VarCreate](https://developers.google.com/blockly/reference/js/blockly.events_namespace.varcreate_class.md)                 | Notifies listeners that a variable model has been created.                                                                                                                                                                  |
| [VarDelete](https://developers.google.com/blockly/reference/js/blockly.events_namespace.vardelete_class.md)                 | Notifies listeners that a variable model has been deleted.                                                                                                                                                                  |
| [VarRename](https://developers.google.com/blockly/reference/js/blockly.events_namespace.varrename_class.md)                 | Notifies listeners that a variable model was renamed.                                                                                                                                                                       |
| [ViewportChange](https://developers.google.com/blockly/reference/js/blockly.events_namespace.viewportchange_class.md)       | Notifies listeners that the workspace surface's position or scale has changed.<br/> Does not notify when the workspace itself resizes.                                                                                            |

## Enumerations

| Enumeration                                                                                                    | Description |
| -------------------------------------------------------------------------------------------------------------- | ----------- |
| [BubbleType](https://developers.google.com/blockly/reference/js/blockly.events_namespace.bubbletype_enum.md)   |             |
| [ClickTarget](https://developers.google.com/blockly/reference/js/blockly.events_namespace.clicktarget_enum.md) |             |

## Interfaces

| Interface                                                                                                                               | Description |
| --------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| [AbstractEventJson](https://developers.google.com/blockly/reference/js/blockly.events_namespace.abstracteventjson_interface.md)         |             |
| [BlockBaseJson](https://developers.google.com/blockly/reference/js/blockly.events_namespace.blockbasejson_interface.md)                 |             |
| [BlockChangeJson](https://developers.google.com/blockly/reference/js/blockly.events_namespace.blockchangejson_interface.md)             |             |
| [BlockCreateJson](https://developers.google.com/blockly/reference/js/blockly.events_namespace.blockcreatejson_interface.md)             |             |
| [BlockDeleteJson](https://developers.google.com/blockly/reference/js/blockly.events_namespace.blockdeletejson_interface.md)             |             |
| [BlockDragJson](https://developers.google.com/blockly/reference/js/blockly.events_namespace.blockdragjson_interface.md)                 |             |
| [BlockMoveJson](https://developers.google.com/blockly/reference/js/blockly.events_namespace.blockmovejson_interface.md)                 |             |
| [BubbleOpenJson](https://developers.google.com/blockly/reference/js/blockly.events_namespace.bubbleopenjson_interface.md)               |             |
| [ClickJson](https://developers.google.com/blockly/reference/js/blockly.events_namespace.clickjson_interface.md)                         |             |
| [CommentBaseJson](https://developers.google.com/blockly/reference/js/blockly.events_namespace.commentbasejson_interface.md)             |             |
| [CommentChangeJson](https://developers.google.com/blockly/reference/js/blockly.events_namespace.commentchangejson_interface.md)         |             |
| [CommentCreateJson](https://developers.google.com/blockly/reference/js/blockly.events_namespace.commentcreatejson_interface.md)         |             |
| [CommentMoveJson](https://developers.google.com/blockly/reference/js/blockly.events_namespace.commentmovejson_interface.md)             |             |
| [FinishedLoadingJson](https://developers.google.com/blockly/reference/js/blockly.events_namespace.finishedloadingjson_interface.md)     |             |
| [MarkerMoveJson](https://developers.google.com/blockly/reference/js/blockly.events_namespace.markermovejson_interface.md)               |             |
| [SelectedJson](https://developers.google.com/blockly/reference/js/blockly.events_namespace.selectedjson_interface.md)                   |             |
| [ThemeChangeJson](https://developers.google.com/blockly/reference/js/blockly.events_namespace.themechangejson_interface.md)             |             |
| [ToolboxItemSelectJson](https://developers.google.com/blockly/reference/js/blockly.events_namespace.toolboxitemselectjson_interface.md) |             |
| [TrashcanOpenJson](https://developers.google.com/blockly/reference/js/blockly.events_namespace.trashcanopenjson_interface.md)           |             |
| [VarBaseJson](https://developers.google.com/blockly/reference/js/blockly.events_namespace.varbasejson_interface.md)                     |             |
| [VarCreateJson](https://developers.google.com/blockly/reference/js/blockly.events_namespace.varcreatejson_interface.md)                 |             |
| [VarDeleteJson](https://developers.google.com/blockly/reference/js/blockly.events_namespace.vardeletejson_interface.md)                 |             |
| [VarRenameJson](https://developers.google.com/blockly/reference/js/blockly.events_namespace.varrenamejson_interface.md)                 |             |
| [ViewportChangeJson](https://developers.google.com/blockly/reference/js/blockly.events_namespace.viewportchangejson_interface.md)       |             |

## Variables

| Variable                                                                                                                           | Description |
| ---------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| [BLOCK_CHANGE](https://developers.google.com/blockly/reference/js/blockly.events_namespace.block_change_variable.md)               |             |
| [BLOCK_CREATE](https://developers.google.com/blockly/reference/js/blockly.events_namespace.block_create_variable.md)               |             |
| [BLOCK_DELETE](https://developers.google.com/blockly/reference/js/blockly.events_namespace.block_delete_variable.md)               |             |
| [BLOCK_DRAG](https://developers.google.com/blockly/reference/js/blockly.events_namespace.block_drag_variable.md)                   |             |
| [BLOCK_MOVE](https://developers.google.com/blockly/reference/js/blockly.events_namespace.block_move_variable.md)                   |             |
| [BUBBLE_OPEN](https://developers.google.com/blockly/reference/js/blockly.events_namespace.bubble_open_variable.md)                 |             |
| [BUMP_EVENTS](https://developers.google.com/blockly/reference/js/blockly.events_namespace.bump_events_variable.md)                 |             |
| [CHANGE](https://developers.google.com/blockly/reference/js/blockly.events_namespace.change_variable.md)                           |             |
| [clearPendingUndo](https://developers.google.com/blockly/reference/js/blockly.events_namespace.clearpendingundo_variable.md)       |             |
| [CLICK](https://developers.google.com/blockly/reference/js/blockly.events_namespace.click_variable.md)                             |             |
| [COMMENT_CHANGE](https://developers.google.com/blockly/reference/js/blockly.events_namespace.comment_change_variable.md)           |             |
| [COMMENT_CREATE](https://developers.google.com/blockly/reference/js/blockly.events_namespace.comment_create_variable.md)           |             |
| [COMMENT_DELETE](https://developers.google.com/blockly/reference/js/blockly.events_namespace.comment_delete_variable.md)           |             |
| [COMMENT_MOVE](https://developers.google.com/blockly/reference/js/blockly.events_namespace.comment_move_variable.md)               |             |
| [CREATE](https://developers.google.com/blockly/reference/js/blockly.events_namespace.create_variable.md)                           |             |
| [DELETE](https://developers.google.com/blockly/reference/js/blockly.events_namespace.delete_variable.md)                           |             |
| [disable](https://developers.google.com/blockly/reference/js/blockly.events_namespace.disable_variable.md)                         |             |
| [disableOrphans](https://developers.google.com/blockly/reference/js/blockly.events_namespace.disableorphans_variable.md)           |             |
| [enable](https://developers.google.com/blockly/reference/js/blockly.events_namespace.enable_variable.md)                           |             |
| [filter](https://developers.google.com/blockly/reference/js/blockly.events_namespace.filter_variable.md)                           |             |
| [FINISHED_LOADING](https://developers.google.com/blockly/reference/js/blockly.events_namespace.finished_loading_variable.md)       |             |
| [fire](https://developers.google.com/blockly/reference/js/blockly.events_namespace.fire_variable.md)                               |             |
| [fromJson](https://developers.google.com/blockly/reference/js/blockly.events_namespace.fromjson_variable.md)                       |             |
| [get](https://developers.google.com/blockly/reference/js/blockly.events_namespace.get_variable.md)                                 |             |
| [getDescendantIds](https://developers.google.com/blockly/reference/js/blockly.events_namespace.getdescendantids_variable.md)       |             |
| [getGroup](https://developers.google.com/blockly/reference/js/blockly.events_namespace.getgroup_variable.md)                       |             |
| [getRecordUndo](https://developers.google.com/blockly/reference/js/blockly.events_namespace.getrecordundo_variable.md)             |             |
| [isEnabled](https://developers.google.com/blockly/reference/js/blockly.events_namespace.isenabled_variable.md)                     |             |
| [MARKER_MOVE](https://developers.google.com/blockly/reference/js/blockly.events_namespace.marker_move_variable.md)                 |             |
| [MOVE](https://developers.google.com/blockly/reference/js/blockly.events_namespace.move_variable.md)                               |             |
| [SELECTED](https://developers.google.com/blockly/reference/js/blockly.events_namespace.selected_variable.md)                       |             |
| [setGroup](https://developers.google.com/blockly/reference/js/blockly.events_namespace.setgroup_variable.md)                       |             |
| [setRecordUndo](https://developers.google.com/blockly/reference/js/blockly.events_namespace.setrecordundo_variable.md)             |             |
| [THEME_CHANGE](https://developers.google.com/blockly/reference/js/blockly.events_namespace.theme_change_variable.md)               |             |
| [TOOLBOX_ITEM_SELECT](https://developers.google.com/blockly/reference/js/blockly.events_namespace.toolbox_item_select_variable.md) |             |
| [TRASHCAN_OPEN](https://developers.google.com/blockly/reference/js/blockly.events_namespace.trashcan_open_variable.md)             |             |
| [UI](https://developers.google.com/blockly/reference/js/blockly.events_namespace.ui_variable.md)                                   |             |
| [VAR_CREATE](https://developers.google.com/blockly/reference/js/blockly.events_namespace.var_create_variable.md)                   |             |
| [VAR_DELETE](https://developers.google.com/blockly/reference/js/blockly.events_namespace.var_delete_variable.md)                   |             |
| [VAR_RENAME](https://developers.google.com/blockly/reference/js/blockly.events_namespace.var_rename_variable.md)                   |             |
| [VIEWPORT_CHANGE](https://developers.google.com/blockly/reference/js/blockly.events_namespace.viewport_change_variable.md)         |             |

## Type Aliases

| Type Alias                                                                                                      | Description |
| --------------------------------------------------------------------------------------------------------------- | ----------- |
| [BumpEvent](https://developers.google.com/blockly/reference/js/blockly.events_namespace.bumpevent_typealias.md) |
