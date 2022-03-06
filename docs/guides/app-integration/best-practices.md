# Custom Blocks: Best Practices 
Over the years the Blockly and Blockly Games team has learned many lessons which are applicable to those developing Blockly-based applications. The following are a collection of mistakes we have made, or mistakes commonly made by others.

These are general lessons we've learned using Blockly's visual style and may not apply to all use cases or designs. Other solutions may exist. This is also not an exhaustive list of problems users may encounter and how to avoid them. Every case is a little bit different and may have its own trade-offs.

## 1. Border Style

In the 2000s the 'Aqua' look was in style and every onscreen object was decorated with highlighting and shadows. In the 2010s the 'Material Design' look is in style and every onscreen object is simplified to a clean, flat, borderless shape. Most block programming environments have highlighting and shadows around each block, so when today's graphic designers see this they invariably strip off these outdated decorations.

![](./mistakes02.png)

As can be seen in the above example of five blocks (from scriptr.io), these 'outdated decorations' are vital for distinguishing connected blocks that are the same colour.

*Recommendation: If reskinning Blockly, don't let today's fashions break your app.*

## 2. Nesting sub-stacks
'C'-shaped blocks invariably have a connector on the inside-top, but some environments also have a connector on the inside bottom (e.g. Wonder Workshop) whereas others do not (e.g. Blockly and Scratch). Since most statement blocks have both a top and bottom connector, some users do not immediately see that statements will fit inside a 'C' that does not have a bottom connector.

![](./mistakes03a.png)

Once users figure out that one statement block fits inside a 'C', they then need to figure out that more that one statement will also fit. Some environments nest the first statement's lower connection into the bottom of the 'C' (e.g. Wonder Workshop and Scratch) whereas others leave a small gap (e.g. Blockly). Snug nesting leaves no hint that more blocks can be stacked.

![](./mistakes03b.png)

These two issues interact badly with each other. If an inside bottom connector exists (Wonder Workshop) then the initial statement's connection is made more obvious, but at the expense of the ability to discover stacking. If no inside bottom connector exists (Blockly) then the initial statement's connection is not obvious, but stacking is discoverable. Having no inside bottom connector and nesting the statement's bottom connector (Scratch) fared the worst for discoverability when tested with Blockly.

Our experience was that the initial statement's connection is a lesser challenge for users than discovering stacking. And once discovered, the former is never forgotten, whereas the latter needs prompting. Blockly tried both the Wonder Workshop and the Scratch approaches until one day a rendering bug occurred which added the small gap. We saw a marked improvement in user studies with Blockly due to this bug (now a 'feature' we are proud of).

*Recommendation: If reskinning Blockly, leave the existing stacking UI.*

## 3. Symmetric Connections
Blockly has two different connection types: the horizontal puzzle shapes and the vertical stacking notches. A good user interface should strive to minimize the number of design elements. Accordingly, many designers try to make both connection types look the same (as shown below).

![](./rotate.png)

The result creates confusion among new users as they search for ways to rotate blocks so that they can fit into incompatible connections. Blockly makes programming elements visual and tangible, so one has to be mindful of inadvertantly suggesting user interactions which are not supported.

Accordingly, Blockly uses a tightly-fitting puzzle shape for value connections, and a visually distinct alignment notch for statement stacking.

*Recommendation: If reskinning Blockly, ensure horizontal and vertical connections look different.*

## 4. Variable and Function Names

![](./mistakes09.png)

Novice programmers do not expect that `location_X` and `location_x` are different variables. As a result, Blockly follows the lead of BASIC and HTML by making variables and functions case-insensitive. Scratch uses a more subtle approach (as seen to the right) and is case-sensitive for variable names but not for equality checks.

Also, Blockly does not require that variables and functions conform to the typical `[_A-Za-z][_A-Za-z0-9]*` scheme. If one wants to name a variable `List of zip codes` or `רשימת מיקודים `that is perfectly alright.

*Recommendation: Ignore case, allow any names.*

## 5. Global Variables
Novice programmers also have difficulties understanding scope. As a result, Blockly follows the lead of Scratch by making all variables global. The only down-side of global variables is that recursion is trickier (one has to push and pop variables onto a list), but that's a programming technique that's beyond the scope of Blockly's target users.

*Recommendation: Scope is out of scope, leave it for later.*

## 6. Instructions

Blockly Games is specifically designed to be self-teaching, no teacher or lesson plan needed. To accomplish this, the first version of Blockly Games had instructions on each level. Most students would not read them. We reduced them to a single sentence, increased the font size, and highlighted them in a yellow bubble. Most students would not read them. We created modal popups with the instructions. Most students instinctively closed the popups without reading them, then were lost.

![](./mistakes06.png)

Finally we created popups that cannot be closed. They are programmed to monitor the student's actions and only close themselves when the student has performed the required action. These contextually-aware popups are challenging to program, but quite effective. It was also important for them to be in the field of view without interfering with the workspace.

*Recommendation: Instructions should be short and persistent, but not obnoxious.*

## 7. Code ownership

Exercises designed to teach a specific concept often provide partial solutions which the student needs to modify to reach the desired effect. A class of non-editable, non-movable, non-deletable blocks was created in Blockly to support this. However, students hated these fill-in-the-blank exercises. They have no sense of ownership over the solution.

![](./mistakes07.png)

Designing free-form exercises that teach the same concepts is more challenging. One technique that has proven successful is to use the student's own solution for one exercise as the starting point for the next exercise.

*Recommendation: Don't write code for the user.*

8. Workspace layout

There are two reasonable ways to layout a screen from left to right. One way starts with the toolbar on the left, the workspace in the middle, and the output visualization on the right. This layout is used by version 1 of Scratch, as well as Made with Code.

![](./mistakes08a.png)

The other way starts with the output visualization on the left, the toolbar in the middle, and the workspace on the right. This layout is used by version 2 of Scratch, as well as most Blockly applications.

![](./mistakes08b.png)

In either case the workspace should stretch to take up available screen size -- users need as much room to program as they can get. As can be seen in the screenshots above, the first layout performs poorly on wide screens since the user's code and the output visualization are separated. Whereas the second layout allows for extra space for larger programs while still keeping all three sections close together.

It also makes logical sense for users to first consider the problem they are attempting to solve, then look at the tools that are provided, and only then start programming.

Of course the entire order needs to be flipped for Arabic and Hebrew translations.

In some cases, such as when using a small number of simple blocks, it may make sense for the toolbox to be above or below the workspace. Blockly supports horizontal scrolling in the Toolbox for these cases, but it should be used with care.

*Recommendation: Place the program visualization next to the toolbar.*

## 9. Exit strategy

Block-based programming is often a starting point for programming. In the context of teaching computer programming, it is a gateway drug that gets students addicted, before moving them on to harder things. How long this block-based programming period should last for students is hotly debated, but if your goal is to teach programming it should be temporary.

Given this, block-based programming environments used for teaching programming must have an off-ramp appropriate to their students. Blockly Games has four strategies:

![](./mistakes99.png)

1. All text on the blocks (e.g. "if", "while") is lowercase to match text-based programming languages.

2. The JavaScript version of the student's code is always displayed after each level to increase familiarity.

3. In the penultimate game the block text is replaced with actual JavaScript (as shown to the right). At this point the student is programming in JavaScript.

4. In the ultimate game the blocks editor is replaced with a text editor.

Block-based programming environments used for teaching programming need to have a concrete plan for graduating their students. A solid exit strategy also goes a long way towards placating those who argue that block-based programming isn't "real programming".

*Recommendation: Consider the user's end goals and design appropriately.*