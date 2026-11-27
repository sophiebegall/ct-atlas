# Coursework problem canvas

Add an independent Problem canvas tab to the static atlas, preserving the existing Rabbit hole, Full map, Flashcards and Homeworks views. Two curated boards follow the user's whiteboard flow: Pignotti's optimal-control variants and Palladino's controllability routes.

Cards contain a short rule and rendered mathematics. Selecting a card opens assumptions, a study-source label and connected steps. Pointer dragging moves cards or pans the background; wheel and buttons zoom. Fit restores an overview. Keyboard users can select cards, follow connections, and move cards with Alt + arrows. Per-board positions persist locally, with a non-blocking fallback when storage is unavailable. Reset only resets the current board.

Keep the implementation dependency-free and reuse vendored KaTeX. Graph data, viewport geometry, and interaction code are separate files. Source labels refer to course dates and homework exercises; private source PDFs are not bundled. The maps are study synthesis, not new official exam questions.

Validation: Node tests for cursor-anchored zoom and fitting moved cards, JavaScript syntax checks, and browser smoke checks for card details, branch navigation, zoom, dragging, keyboard movement, persistence, reset and existing-view isolation.

## Linked study material

Canvas cards link to explicit flashcard IDs, Rabbit hole concept IDs, and homework sheet/problem pairs. Homework navigation selects the target sheet and focuses the exact problem without revealing its answer. A shared in-app back stack supports nested cross-view visits, restoring the originating canvas selection and transform, flashcard filters/display/reveal state, or Rabbit hole concept. Choosing a top-level tab starts a new navigation trail. Browser reload resets the trail; saved canvas positions remain persistent.

All link targets are checked against the bundled study data. Browser checks cover canvas → homework → back and canvas → flashcard → concept → back → back, including unchanged canvas transforms.
