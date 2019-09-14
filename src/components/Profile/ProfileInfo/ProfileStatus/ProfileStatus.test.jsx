import React from 'react'
import {create, act} from 'react-test-renderer'
import ProfileStatus from "./ProfileStatus"

describe('ProfileStatus component', () => {
    test('status from props should be in the state', () => {
        const component = create(<ProfileStatus status='test' />)
        const root = component.root
        // const instance = component.getInstance()
        expect(root._fiber.pendingProps.status).toBe('test')
    })

    test('after creation span should be displayed', () => {
        const component = create(<ProfileStatus status='test' />)
        const root = component.root
        let p = root.findByType('p')
        expect(p).not.toBeNull()
    })

    test('after creation input should\'t be displayed', () => {
        const component = create(<ProfileStatus status='test' />)
        const root = component.root
        expect(() => {
            let input = root.findByType('input')
        }).toThrow()
    })

    test('after creation span should contains correct status', () => {
        const component = create(<ProfileStatus status='test'/>)
        const root = component.root
        let p = root.findByType('p')
        expect(p.children[0]).toBe('test')
    })

    test('input should be displayed in editMode instead of p', () => {
        const component = create(<ProfileStatus status='test' />)
        const root = component.root
        let p = root.findByType('p')
        act(() => {
            p.props.onDoubleClick()
        })
        let input = root.findByType('input')
        expect(input.props.value).toBe('test')
    })

    // test('callback should be called', () => {
    //     const mockCallback = jest.fn()
    //     const component = create(<ProfileStatus status='test' updateStatus={mockCallback} />)
    //     const root = component.root
    //     // instance.deactivateEditMode()
    //     // expect(mockCallback.mock.calls.length).toBe(1)
    // })
})