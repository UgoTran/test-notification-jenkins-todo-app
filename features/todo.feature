Feature: Todo Application

    As a user, I want to manage my todo items so that I can keep track of my tasks.

    Background:
        Given the Todo application is loaded in browser

    Scenario: Verify a new todo item can be added successfully
        When I enter "Buy groceries" in the "What needs to be done?" input field
        And I press Enter key
        Then a new todo item with text "Buy groceries" appears in the todo list

    Scenario: Verify multiple todo items can be added
        When I enter "Task 1" in the input field and press Enter
        And I enter "Task 2" in the input field and press Enter
        And I enter "Task 3" in the input field and press Enter
        Then three separate todo items appear in the list in the same order they were entered

    Scenario: Verify a todo item can be marked as completed
        Given the Todo application is loaded with at least one todo item
        When I click the circle checkbox before the todo item
        Then the todo item should be marked as completed (checkbox checked)
        And the text should be crossed out (with line-through style)

    Scenario: Verify a completed todo item can be marked as active again
        Given the Todo application has at least one completed todo item
        When I click the checkbox of a completed todo item
        Then the todo item should return to active state (checkbox unchecked, text not crossed out)

    Scenario: Verify todo items can be filtered by "Active" status
        Given the Todo application has a mix of completed and active todo items
        When I click on the "Active" filter link at the bottom of the list
        Then only active (uncompleted) todo items should be displayed

    Scenario: Verify todo items can be filtered by "Completed" status
        Given the Todo application has a mix of completed and active todo items
        When I click on the "Completed" filter link at the bottom of the list
        Then only completed todo items should be displayed

    Scenario: Verify deleted todo items are removed from the list
        Given the Todo application has at least one todo item
        When I hover mouse over a todo item
        And I click the "×" button that appears on the right side of the item
        Then the todo item should be removed from the list

    Scenario: Verify the "Clear completed" button removes all completed items
        Given the Todo application has multiple completed todo items
        When I click the "Clear completed" button at the bottom of the list
        Then all completed todo items should be removed
        And active items remain

    Scenario: Verify the item counter correctly shows number of active items
        When I add several todo items
        And I mark some as completed
        Then the counter should display the exact number of active (uncompleted) todo items

    Scenario: Verify a todo item's text can be edited
        Given the Todo application has at least one todo item
        When I double-click on an existing todo item text
        And I edit the text to "Updated task"
        And I press Enter key
        Then the todo item text should be updated to "Updated task"

    Scenario: Verify empty todo items cannot be created
        When I enter only spaces in the input field
        And I press Enter key
        Then no new todo item should be created

    Scenario: Verify "Mark all as complete" toggle functionality
        Given the Todo application has multiple active todo items
        When I click the down arrow toggle button on the left of the input field
        Then all todo items should be marked as completed

    Scenario: Verify persistence of todo items after page refresh
        Given the Todo application has several todo items in various states
        When I refresh the browser page
        Then all todo items and their states should remain unchanged after the page refresh

    Scenario: Verify long text handling in todo items
        When I enter very long text (200+ characters) as a todo item
        And I press Enter key
        Then the todo item should be created and display the full text properly (possibly with wrapping)

    Scenario: Verify cancellation of edit mode without saving changes
        Given the Todo application has at least one todo item
        When I double-click a todo item to enter edit mode
        And I modify the text
        And I press Escape key
        Then edit mode should exit and the todo item should revert to its original text